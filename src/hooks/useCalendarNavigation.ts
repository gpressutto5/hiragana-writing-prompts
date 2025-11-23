import { useState } from 'react';

/**
 * Navigation functions for calendar date management
 */
export interface CalendarNavigation {
  /** Current date being displayed */
  currentDate: Date;
  /** Set the current date */
  setCurrentDate: (date: Date) => void;
  /** Navigate to the previous month */
  previousMonth: () => void;
  /** Navigate to the next month */
  nextMonth: () => void;
  /** Navigate to the previous week */
  previousWeek: () => void;
  /** Navigate to the next week */
  nextWeek: () => void;
}

/**
 * Custom hook for calendar navigation (month and week navigation)
 *
 * @param initialDate - Initial date to display (default: today)
 * @returns Calendar navigation object with date and navigation functions
 */
export const useCalendarNavigation = (initialDate: Date = new Date()): CalendarNavigation => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return {
    currentDate,
    setCurrentDate,
    previousMonth,
    nextMonth,
    previousWeek,
    nextWeek,
  };
};
