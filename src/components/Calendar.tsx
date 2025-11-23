import { useState } from 'react';
import { getDailyPracticeHistory, getStreakData } from '../utils/progressTracker';
import { getPracticeCountColor } from '../utils/colorUtils';
import { getToggleButtonClass } from '../utils/buttonStyles';
import { useCalendarNavigation } from '../hooks/useCalendarNavigation';
import { getDateString } from '../utils/dateUtils';

type ViewMode = 'month' | 'week';

function Calendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const { currentDate, previousMonth, nextMonth, previousWeek, nextWeek } = useCalendarNavigation();

  const streakData = getStreakData();
  const dailyPractice = getDailyPracticeHistory();

  // Create a map for quick lookup of practice counts by date
  const practiceMap = new Map<string, number>();
  dailyPractice.forEach(({ date, attemptCount }) => {
    practiceMap.set(date, attemptCount);
  });

  // Get the first day of the current month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Get day of week for first day (0 = Sunday)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Generate calendar days
  const generateMonthDays = () => {
    const days = [];
    const daysInMonth = lastDayOfMonth.getDate();

    // Add empty cells for days before the month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Generate week days (7 days centered on current date)
  const generateWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const getPracticeCountForDay = (day: number | null): number => {
    if (day === null) return 0;

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = getDateString(date);
    return practiceMap.get(dateStr) ?? 0;
  };

  const getPracticeCountForDate = (date: Date): number => {
    const dateStr = getDateString(date);
    return practiceMap.get(dateStr) ?? 0;
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthDays = viewMode === 'month' ? generateMonthDays() : [];
  const weekDays = viewMode === 'week' ? generateWeekDays() : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Practice Calendar</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('month')}
            className={getToggleButtonClass(viewMode === 'month')}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={getToggleButtonClass(viewMode === 'week')}
          >
            Week
          </button>
        </div>
      </div>

      {/* Streak Statistics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-orange-900">{streakData.currentStreak}</div>
          <div className="text-xs text-orange-700 mt-1">Current Streak</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-900">{streakData.longestStreak}</div>
          <div className="text-xs text-purple-700 mt-1">Longest Streak</div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={viewMode === 'month' ? previousMonth : previousWeek}
          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
        >
          ← Previous
        </button>
        <h4 className="text-base font-semibold text-gray-800">
          {viewMode === 'month'
            ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
            : `Week of ${monthNames[weekDays[0]?.getMonth() ?? 0]} ${weekDays[0]?.getDate() ?? 1}`}
        </h4>
        <button
          onClick={viewMode === 'month' ? nextMonth : nextWeek}
          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
        >
          Next →
        </button>
      </div>

      {/* Month View */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          {/* Day names header */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 text-xs py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const practiceCount = getPracticeCountForDay(day);
              const colorClass = getPracticeCountColor(practiceCount);
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center ${colorClass} ${
                    isToday ? 'ring-2 ring-indigo-500' : ''
                  } transition-all hover:scale-105 cursor-pointer`}
                  title={`${day} - ${practiceCount} practice${practiceCount !== 1 ? 's' : ''}`}
                >
                  <div className="text-sm font-semibold">{day}</div>
                  {practiceCount > 0 && (
                    <div className="text-xs text-white font-bold mt-1">{practiceCount}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(date => {
              const practiceCount = getPracticeCountForDate(date);
              const colorClass = getPracticeCountColor(practiceCount);
              const isToday = getDateString(date) === getDateString(new Date());

              return (
                <div key={date.toISOString()} className="text-center">
                  <div className="font-semibold text-gray-600 text-sm mb-2">
                    {dayNames[date.getDay()]}
                  </div>
                  <div
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center ${colorClass} ${
                      isToday ? 'ring-2 ring-indigo-500' : ''
                    } transition-all hover:scale-105 cursor-pointer`}
                    title={`${date.getMonth() + 1}/${date.getDate()} - ${practiceCount} practice${practiceCount !== 1 ? 's' : ''}`}
                  >
                    <div className="text-lg font-semibold">{date.getDate()}</div>
                    {practiceCount > 0 && (
                      <div className="text-sm text-white font-bold mt-1">{practiceCount}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-3 text-xs text-gray-600">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <div className="w-4 h-4 bg-green-800 rounded"></div>
        </div>
        <span>More</span>
      </div>

      {dailyPractice.length === 0 && (
        <div className="text-center py-6 mt-3">
          <div className="text-4xl mb-2">📅</div>
          <p className="text-sm text-gray-600">Start practicing to build your streak!</p>
        </div>
      )}
    </div>
  );
}

export default Calendar;
