import React from 'react';

export const Contact = ({ contentMail, contentNro }) => {
  return (
    <section className="flex h-full py-24 mx-12 border-t-2 ">
      <div className="flex items-center justify-center flex-1">
        <button className="flex items-center justify-center gap-8 p-4 my-auto text-2xl text-center transition-colors duration-200 border-solid rounded-es-3xl rounded-e-2xl bg-[#999999] hover:bg-[#707072]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.01em"
            height="1em"
            viewBox="0 0 1025 1024"
            className=""
          >
            <path
              fill=""
              d="M800.712 1024q-93 0-158.5-65.5t-65.5-158.5t65.5-158.5t158.5-65.5t158.5 65.5t65.5 158.5t-65.5 158.5t-158.5 65.5m128-256h-96v-96q0-13-9.5-22.5t-22.5-9.5t-22.5 9.5t-9.5 22.5v128q0 12 7.5 20.5t18.5 10.5q2 1 6 1h128q13 0 22.5-9.5t9.5-22.5t-9.5-22.5t-22.5-9.5m-448 64h-192q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5m-192-192h192q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5m320-64h-320q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h320q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5m128-128h-448q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h448q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5m0-256h-448q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h448q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5m0 128h-448q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h448q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5m96-224q0-13-9.5-22.5t-22.5-9.5h-640q-13 0-22.5 9.5t-9.5 22.5v32q27 0 45.5 18.5t18.5 45.5t-18.5 45.5t-45.5 18.5v64q27 0 45.5 18.5t18.5 45.5t-18.5 45.5t-45.5 18.5v64q27 0 45.5 18.5t18.5 45t-18.5 45.5t-45.5 19v64q27 0 45.5 18.5t18.5 45t-18.5 45.5t-45.5 19v32q0 13 9.5 22.5t22.5 9.5h416v64h-448q-26 0-45-19t-19-45v-64q-26 0-45-19t-19-45.5t19-45t45-18.5v-64q-26 0-45-19t-19-45.5t19-45t45-18.5v-64q-26 0-45-18.5t-19-45.5t19-45.5t45-18.5v-64q-26 0-45-18.5t-19-45.5t19-45.5t45-18.5V64q0-27 19-45.5t45-18.5h704q26 0 45 18.5t19 45.5v448h-64z"
            />
          </svg>
          CONTACTO DIRECTO
        </button>{' '}
      </div>
      <div className="flex-1 m-2 ml-64 mb-9">
        <h2 className="p-4 pl-24 my-8 text-2xl ">Contact:</h2>
        <div className="pl-24">
          <div className="flex items-center gap-6 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#999999"
                fillRule="evenodd"
                d="M5 20a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3zM7.625 8.22a1 1 0 1 0-1.25 1.56l3.75 3.001a3 3 0 0 0 3.75 0l3.75-3a1 1 0 1 0-1.25-1.562l-3.75 3a1 1 0 0 1-1.25 0z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="hover:text-[#999999] transition-colors duration-200">
              {contentMail}
            </h1>
          </div>
          <div className="flex items-center gap-6 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                d="M16 18H7V4h9m-4.5 18a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m4-21h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1z"
                fill="#999999"
              />
            </svg>
            <h1 className="hover:text-[#999999] transition-colors duration-200">
              {contentNro}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
