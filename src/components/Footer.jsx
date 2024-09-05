import React from 'react';

export const Footer = () => {
  return (
    <footer className="bottom-0 w-full px-4 py-4 text-sm text-white bg-gradient-to-r from-zinc-500 to-purple-300">
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
  );
};
