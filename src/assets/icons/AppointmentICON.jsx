import React from 'react';

export const AppointmentICON = ({ h, w, color }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}
        viewBox="0 0 48 48"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.5 12.645h37m-3.5 1.5v-3m-10 3v-3m-10 3v-3m-10 3v-3m11.375 14.332L24 23.503m0 0v14.501m0 0c5.58-.004 10.099-4.531 10.094-10.11c-.004-5.58-4.531-10.1-10.11-10.095c-5.58.005-10.1 4.531-10.095 10.11a10.1 10.1 0 0 0 6.122 9.278"
        />
        <rect
          width="37"
          height="37"
          x="5.5"
          y="5.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          rx="4"
          ry="4"
        />
      </svg>
    </>
  );
};