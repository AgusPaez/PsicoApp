import React, { useState } from 'react';

export const Alerts = ({ condition, title, message, time }) => {
  const [visible, setVisible] = useState(true);
  setTimeout(() => {
    setVisible(false);
  }, time);
  return (
    <>
      {visible && (
        <>
          {' '}
          <div className="absolute left-0 z-50 flex items-center justify-center w-full h-auto">
            <div className="w-11/12 sm:w-2/3 lg:w-1/2 mt-3 bg-[#409c9c] rounded-md border border-gray-300 p-6 sm:p-16 py-10 flex flex-col items-center justify-center z-50">
              <div className="cartelImg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill={condition === 'success' ? '#059669' : '#DC2626'}
                    d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2m0 1a5 5 0 1 0 0 10A5 5 0 0 0 8 3m-.75 6.042l2.87-2.878a.5.5 0 0 1 .766.637l-.058.07l-3.224 3.232a.5.5 0 0 1-.638.059l-.07-.058l-1.75-1.75a.5.5 0 0 1 .638-.765l.07.057z"
                  />
                </svg>
              </div>
              <h1 className="font-bold text-xl sm:text-3xl text-center leading-8 text-[#4F575D] mt-3">
                {title}
              </h1>
              <br />
              <p className="font-light text-sm sm:text-md leading-7 text-[#4F575D] text-center">
                {message}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
