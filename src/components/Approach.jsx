import React from 'react';

export const Approach = ({ content }) => {
  return (
    <section>
      <div className="relative my-16 border-t-2 md:mx-28 border-[#8cabe7]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5em"
          height="3.5em"
          viewBox="0 0 24 24"
          className="absolute left-6 top-6"
        >
          <path
            fill="none"
            stroke="#8cabe7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.26 10.147a60 60 0 0 0-.491 6.347A48.6 48.6 0 0 1 12 20.904a48.6 48.6 0 0 1 8.232-4.41a61 61 0 0 0-.491-6.347m-15.482 0a51 51 0 0 0-2.658-.813A60 60 0 0 1 12 3.493a60 60 0 0 1 10.399 5.84q-1.345.372-2.658.814m-15.482 0A51 51 0 0 1 12 13.489a50.7 50.7 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5m0 0v-3.675A55 55 0 0 1 12 8.443m-7.007 11.55A5.98 5.98 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
        <h1 className="m-2 my-10 text-3xl ml-28">Abordaje y estudio</h1>
        <p className="px-4 mt-4 text-lg text-center text-gray-700 md:px-16 ">
          {content}
        </p>
      </div>

      <section className="relative md:px-4 md:my-16">
        <div className="grid grid-cols-1 text-center md:my-20 md:space-x-10 md:flex md:justify-around md:mx-28">
          <div className="relative md:w-[38%] mb-12 h-5/6 p-8 rounded-lg shadow-md shadow-[#8cabe7] border-t border-b border-[#99b9fa] bg-[#99b9fa] bg-opacity-30 hover:bg-[#99b9fa] hover:tracking-wide transition-all duration-300 hover:bg-opacity-50 cursor-pointer">
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

          <div className="relative md:w-[38%] p-8 h-full rounded-lg shadow-md shadow-[#8cabe7] border-t border-b border-[#99b9fa] bg-[#99b9fa] bg-opacity-30 hover:bg-[#99b9fa] hover:tracking-wide transition-all duration-300 hover:bg-opacity-50 cursor-pointer">
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
