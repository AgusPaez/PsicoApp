//imports
import React from 'react';

export const FooterPatient = () => {
  return (
    <>
      <footer className="fixed bottom-0 w-full px-4 py-4 text-sm text-white bg-gradient-to-r from-zinc-700 to-purple-800">
        <p>Copyright &copy; {new Date().getFullYear()} Agustin Paez</p>
        <ul className="flex justify-center mt-4 space-x-4">
          <li>
            <a href="#" className="text-gray-400 hover:text-white">
              Sobre mi
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">
              Contacto
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">
              Legal
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};
