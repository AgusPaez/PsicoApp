import React from 'react';

export const Footer = () => {
  return (
    <>
      <footer className="fixed inset-x-0 bottom-0 bg-gradient-to-r from-zinc-500 to-purple-300 text-white text-sm px-4 py-4">
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
