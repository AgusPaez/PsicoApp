import React from 'react';

export const AboutMeICON = ({ h, w, color }) => {
  return (
    <>
      <svg
        className="animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
        height={h}
        width={w}
        viewBox="0 0 48 48"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M38.5 5.5h-29a4 4 0 0 0-4 4v29a4 4 0 0 0 4 4h29a4 4 0 0 0 4-4v-29a4 4 0 0 0-4-4"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.72 5.5h4.56v8.554h-4.56z"
        />
        <circle
          cx="18.869"
          cy="23.804"
          r="3.28"
          fill={color}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fill={color}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.477 35.477a6.392 6.392 0 1 1 12.785 0zm15.205-6.393h7.841m-7.841-4h7.841m-7.841 8h7.841"
        />
      </svg>
    </>
  );
};