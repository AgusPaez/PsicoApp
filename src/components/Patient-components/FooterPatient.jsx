//imports
import React from 'react';

export const FooterPatient = () => {
  return (
    <>
      <footer className="bottom-0 w-full z-50 px-4 py-4 text-sm text-white bg-gradient-to-r from-[#7a6b6bd8]  via-[#949191] via-50% to-[#7a6b6bd8] ">
        <p>Copyright &copy; {new Date().getFullYear()} Agustin Paez</p>
        <ul className="flex justify-center mt-4 space-x-4">
          <li>
            <a
              href="#"
              className="transition-all duration-500 text-slate-600 hover:text-white hover:tracking-widest"
            >
              Sobre mi
            </a>
          </li>
          <li>
            <a
              href="#"
              className="transition-all duration-500 text-slate-600 hover:text-white hover:tracking-widest"
            >
              Contacto
            </a>
          </li>
          <li>
            <a
              href="#"
              className="transition-all duration-500 text-slate-600 hover:text-white hover:tracking-widest"
            >
              Legal
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};
