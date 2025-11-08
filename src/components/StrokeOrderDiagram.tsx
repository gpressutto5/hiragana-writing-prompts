import { useState } from 'react';
import type { HiraganaCharacter, Stroke } from '../types';

interface StrokeOrderDiagramProps {
  character: HiraganaCharacter;
}

// Sample stroke order data for demonstration
// This will be expanded to include all hiragana characters
const strokeOrderData: Record<string, Stroke[]> = {
  // あ (a) - 3 strokes
  a: [
    { path: 'M 30 25 Q 35 30 40 45 Q 42 55 40 65', number: 1 },
    { path: 'M 55 20 Q 58 35 60 50 Q 62 70 58 85', number: 2 },
    { path: 'M 25 70 Q 40 68 55 70 Q 70 72 80 75', number: 3 },
  ],
  // い (i) - 2 strokes
  i: [
    { path: 'M 35 20 Q 37 40 38 60 Q 39 75 38 85', number: 1 },
    { path: 'M 60 25 Q 62 45 63 65 Q 64 80 62 90', number: 2 },
  ],
  // う (u) - 2 strokes
  u: [
    { path: 'M 35 30 Q 45 28 55 30', number: 1 },
    { path: 'M 40 45 Q 45 55 50 65 Q 58 75 68 80', number: 2 },
  ],
  // え (e) - 2 strokes
  e: [
    { path: 'M 30 35 Q 45 33 60 35 Q 70 37 75 40', number: 1 },
    { path: 'M 35 55 Q 50 52 65 55 Q 72 58 75 62', number: 2 },
  ],
  // お (o) - 3 strokes
  o: [
    { path: 'M 25 25 Q 30 28 35 35', number: 1 },
    { path: 'M 55 20 Q 58 35 60 50 Q 62 70 58 85', number: 2 },
    { path: 'M 30 55 Q 45 52 60 55 Q 72 58 78 62', number: 3 },
  ],
};

// Stroke colors for visual distinction
const strokeColors = [
  '#ef4444', // red
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
];

function StrokeOrderDiagram({ character }: StrokeOrderDiagramProps) {
  const [showStrokeOrder, setShowStrokeOrder] = useState(false);

  const strokes = strokeOrderData[character.id];
  const hasStrokeData = strokes !== undefined && strokes.length > 0;

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowStrokeOrder(!showStrokeOrder)}
        className="text-sm text-indigo-600 hover:text-indigo-800 underline mb-3"
      >
        {showStrokeOrder ? 'Hide' : 'Show'} Stroke Order
      </button>

      {showStrokeOrder && (
        <div className="bg-white rounded-lg p-6 border-2 border-indigo-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Stroke Order for {character.hiragana} ({character.romaji})
          </h3>

          <div className="flex items-center justify-center mb-4">
            <div className="relative w-64 h-64 bg-gray-50 rounded border-2 border-gray-300">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 109 109">
                {/* Center guides */}
                <line
                  x1="54.5"
                  y1="0"
                  x2="54.5"
                  y2="109"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <line
                  x1="0"
                  y1="54.5"
                  x2="109"
                  y2="54.5"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />

                {hasStrokeData ? (
                  <>
                    {/* Render strokes with numbers */}
                    {strokes.map((stroke, index) => {
                      const color = strokeColors[index % strokeColors.length];
                      // Extract start point from path for number placement
                      const pathMatch = stroke.path.match(/M\s+([\d.]+)\s+([\d.]+)/);
                      const startX = pathMatch !== null ? parseFloat(pathMatch[1]) : 0;
                      const startY = pathMatch !== null ? parseFloat(pathMatch[2]) : 0;

                      return (
                        <g key={index}>
                          {/* Stroke path */}
                          <path
                            d={stroke.path}
                            stroke={color}
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.8"
                          />
                          {/* Stroke number */}
                          <circle cx={startX} cy={startY} r="8" fill={color} opacity="0.9" />
                          <text
                            x={startX}
                            y={startY}
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="white"
                          >
                            {stroke.number}
                          </text>
                          {/* Arrow at the end of stroke to show direction */}
                          <defs>
                            <marker
                              id={`arrowhead-${index}`}
                              markerWidth="10"
                              markerHeight="10"
                              refX="9"
                              refY="3"
                              orient="auto"
                            >
                              <polygon points="0 0, 10 3, 0 6" fill={color} opacity="0.8" />
                            </marker>
                          </defs>
                          <path
                            d={stroke.path}
                            stroke={color}
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0"
                            markerEnd={`url(#arrowhead-${index})`}
                          />
                        </g>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {/* Fallback for characters without stroke data */}
                    <text
                      x="54.5"
                      y="54.5"
                      fontSize="72"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#6366f1"
                      opacity="0.3"
                      fontFamily="sans-serif"
                    >
                      {character.hiragana}
                    </text>
                  </>
                )}
              </svg>
            </div>
          </div>

          {hasStrokeData ? (
            <>
              <div className="text-sm text-gray-600 space-y-2 mb-4">
                <p className="font-medium">Writing {character.hiragana}:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  {strokes.map(stroke => (
                    <li key={stroke.number}>
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-1"
                        style={{
                          backgroundColor: strokeColors[(stroke.number - 1) % strokeColors.length],
                        }}
                      ></span>
                      Stroke {stroke.number}: Follow the{' '}
                      <span
                        style={{
                          color: strokeColors[(stroke.number - 1) % strokeColors.length],
                          fontWeight: 600,
                        }}
                      >
                        {['red', 'blue', 'green', 'amber', 'violet', 'pink'][
                          (stroke.number - 1) % 6
                        ] ?? 'colored'}
                      </span>{' '}
                      line in the direction of the arrow
                    </li>
                  ))}
                </ol>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p className="font-medium">General tips:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Complete each stroke in one continuous motion</li>
                  <li>Pay attention to the direction shown by the arrows</li>
                  <li>Practice writing slowly at first to build muscle memory</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="font-medium">Tips for writing {character.hiragana}:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Follow the stroke order from top to bottom, left to right</li>
                  <li>Complete each stroke in one continuous motion</li>
                  <li>Pay attention to the direction of each stroke</li>
                  <li>Practice writing slowly at first to build muscle memory</li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Detailed stroke order data for this character is not yet
                  available. Please refer to external resources for precise stroke order practice.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default StrokeOrderDiagram;
