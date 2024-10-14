import React from 'react';

export const Approach = ({ content }) => {
  return (
    <section>
      <div className="relative my-16 border-t-2 mx-28 border-[#8cabe7]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5em"
          height="3.5em"
          viewBox="0 0 20 20"
          className="absolute left-6 top-6"
        >
          <path
            fill="#8cabe7"
            d="M10 11.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M5 10a4.999 4.999 0 0 1 9.996-.055l-2.412 2.413a3.499 3.499 0 1 0-.228.228l-2.083 2.083q-.156.156-.288.33A5 5 0 0 1 5.001 10m4.995-6.5c3.28 0 5.991 2.43 6.434 5.587a2.9 2.9 0 0 1 1.515.031a7.998 7.998 0 1 0-8.935 8.816q.013-.14.049-.282l.297-1.188A6.498 6.498 0 0 1 9.996 3.5m.985 11.876l4.828-4.828a1.87 1.87 0 1 1 2.643 2.644l-4.827 4.828a2.2 2.2 0 0 1-1.02.578l-1.498.375a.89.89 0 0 1-1.078-1.079l.374-1.497a2.2 2.2 0 0 1 .578-1.02"
          />
        </svg>
        <h1 className="m-2 my-10 text-3xl ml-28">Abordaje y estudio</h1>
        <p className="px-16 text-lg "> {content} </p>
      </div>

      <section className="relative px-4 my-16">
        {/* <h2 className="mb-12 text-4xl font-bold text-center text-indigo-600">
          Estudios y Abordaje
        </h2> */}
        <div className="grid grid-cols-1 my-20 space-x-10 text-center md:flex md:justify-around mx-28">
          <div className="relative w-[38%] p-8 rounded-lg shadow-md shadow-[#8cabe7] border-t border-b border-[#99b9fa] bg-[#99b9fa] bg-opacity-30 hover:bg-[#99b9fa] hover:tracking-wide transition-all duration-300 hover:bg-opacity-50 cursor-pointer">
            <div className="absolute top-[-20px] left-[-20px] bg-[#8cabe7] text-white text-2xl rounded-full px-4 py-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Licenciatura en Psicología
            </h3>
            <p className="text-gray-700">Universidad de Buenos Aires, 2012</p>
          </div>

          <div className="relative w-[38%] p-8 rounded-lg shadow-md shadow-[#8cabe7] border-t border-b border-[#99b9fa] bg-[#99b9fa] bg-opacity-30 hover:bg-[#99b9fa] hover:tracking-wide transition-all duration-300 hover:bg-opacity-50 cursor-pointer">
            <div className="absolute top-[-20px] left-[-20px] bg-[#8cabe7] text-white text-2xl rounded-full px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Especialización en Terapia Cognitivo-Conductual
            </h3>
            <p className="text-gray-700">
              Universidad Nacional de La Plata, 2016
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};
