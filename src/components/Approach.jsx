import React from 'react';

export const Approach = ({ content }) => {
  return (
    <section>
      <div className="relative my-16 border-t-2 mx-28 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5em"
          height="3.5em"
          viewBox="0 0 20 20"
          className="absolute left-6 top-6"
        >
          <path
            fill="#999999"
            d="M10 11.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M5 10a4.999 4.999 0 0 1 9.996-.055l-2.412 2.413a3.499 3.499 0 1 0-.228.228l-2.083 2.083q-.156.156-.288.33A5 5 0 0 1 5.001 10m4.995-6.5c3.28 0 5.991 2.43 6.434 5.587a2.9 2.9 0 0 1 1.515.031a7.998 7.998 0 1 0-8.935 8.816q.013-.14.049-.282l.297-1.188A6.498 6.498 0 0 1 9.996 3.5m.985 11.876l4.828-4.828a1.87 1.87 0 1 1 2.643 2.644l-4.827 4.828a2.2 2.2 0 0 1-1.02.578l-1.498.375a.89.89 0 0 1-1.078-1.079l.374-1.497a2.2 2.2 0 0 1 .578-1.02"
          />
        </svg>
        <h1 className="m-2 my-8 text-3xl ml-28">Abordaje y estudio</h1>
        <span className="p-10 px-20 text-xl mx-7"> {content}</span>
      </div>
    </section>
  );
};
