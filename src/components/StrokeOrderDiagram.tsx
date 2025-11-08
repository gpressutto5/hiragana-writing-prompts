import { useState } from 'react';
import type { HiraganaCharacter } from '../types';

interface StrokeOrderDiagramProps {
  character: HiraganaCharacter;
}

function StrokeOrderDiagram({ character }: StrokeOrderDiagramProps) {
  const [showStrokeOrder, setShowStrokeOrder] = useState(false);

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
              {/* Grid lines for reference */}
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

                {/* Character placeholder - displays large hiragana */}
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
              </svg>

              {/* Stroke order numbers overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-sm text-gray-600">
                  <p className="font-medium">Stroke order diagram</p>
                  <p className="text-xs mt-1">Practice writing following</p>
                  <p className="text-xs">the numbered strokes</p>
                </div>
              </div>
            </div>
          </div>

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
              <strong>Note:</strong> Detailed animated stroke order diagrams are coming soon. For
              now, use this reference along with external resources for precise stroke order
              practice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StrokeOrderDiagram;
