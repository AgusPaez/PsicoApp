import React from 'react';

export const Footer = () => {
  return (
    <footer className="bottom-0 w-full px-4 py-6 text-sm text-white bg-gradient-to-r from-[#6aabff70] to-purple-300 z-50">
      <p className="text-slate-600">
        Copyright &copy; {new Date().getFullYear()} Agustin Paez
      </p>
      <ul className="flex justify-center mt-4 space-x-7">
        <li>
          <a
            href="/AboutMe"
            className="transition-all duration-500 text-slate-600 hover:text-white hover:tracking-widest"
          >
            Sobre mi
          </a>
        </li>
        <li>
          <a
            href="/Appointment"
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
  );
};
