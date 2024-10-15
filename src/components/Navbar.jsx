import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//Icons
import MenuIcon from '../assets/icons/MenuIcon';
//images
import SymbolPsico from '../assets/icons/pngwing.com.png';
import NotificationsIcon from '../assets/icons/NotificationsIcon';
import loginIcon from '../assets/icons/PhUserDuotone.png';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  //States
  const [openMenu, setOpenMenu] = useState(false);
  const [optionsProfile, setOptionsProfile] = useState(false);
  const buttonClass = (path) => `${
    isActive(path) ? 'bg-gray-600 text-white tracking-wider tracking-wider' : ''
  } 
`;
  //open menu function
  const showMenu = () => {
    setOpenMenu(!openMenu);
  };
  const openOptionsProfile = () => {
    setOptionsProfile(!optionsProfile);
    navigate('/login');
  };

  return (
    <nav className=" bg-gradient-to-r from-[#6aabff70] to-purple-300 z-10">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-[4.5rem]">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={showMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <MenuIcon />

              <svg
                className="hidden w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* ***************** End menu botton  ******************** */}
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0 ">
              <img
                className="h-10 xl:h-16 w-auto xl:absolute  xl:-left-[8vh] 2xl:-left-[18vh]"
                src={SymbolPsico}
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/AboutMe"
                  className={
                    buttonClass('/AboutMe') +
                    'text-gray-600 hover:bg-gray-600  hover:text-white rounded-md px-[0.80rem] py-[0.60rem] text-base hover:tracking-wider font-medium transition-all duration-500'
                  }
                  aria-current="page"
                >
                  Sobre Mi
                </a>
                <a
                  href="/Appointment"
                  className={
                    buttonClass('/Appointment') +
                    'text-gray-600 hover:bg-gray-600  hover:text-white rounded-md px-[0.80rem] py-[0.60rem] text-base hover:tracking-wider font-medium transition-all duration-500'
                  }
                >
                  Citas
                </a>
                <a
                  href="/Studies"
                  className={
                    buttonClass('/Studies') +
                    'text-gray-600 hover:bg-gray-600  hover:text-white rounded-md px-[0.80rem] py-[0.60rem] text-base hover:tracking-wider font-medium transition-all duration-500'
                  }
                >
                  Estudios
                </a>
                <a
                  href="/Login"
                  className={
                    buttonClass('/Login') +
                    'text-gray-600 hover:bg-gray-600  hover:text-white rounded-md px-[0.80rem] py-[0.60rem] text-base hover:tracking-wider font-medium transition-all duration-500'
                  }
                >
                  Login
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex items-center justify-center p-1 text-sm transition-all duration-300 bg-gray-800 rounded-full w-11 h-11 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:drop-shadow-2xl hover:scale-105 hover:ring-2"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={openOptionsProfile}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img className="h-6" src={loginIcon}></img>
                </button>
              </div>
              {/* END Profile */}
            </div>
          </div>
        </div>
      </div>
      {/*  END PROFILE OPTIONS  */}

      {/* Mobile Menu */}
      {openMenu && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 ">
            <a
              href="/AboutMe"
              className={
                buttonClass('/AboutMe') +
                'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
              }
              aria-current="page"
            >
              Sobre Mi
            </a>
            <a
              href="/Appointment"
              className={
                buttonClass('/Appointment') +
                'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
              }
            >
              Citas
            </a>
            <a
              href="/Studies"
              className={
                buttonClass('/Studies') +
                'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
              }
            >
              Estudios
            </a>
            <a
              href="/Login"
              className={
                buttonClass('/Login') +
                'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
              }
            >
              Login
            </a>
          </div>
        </div>
      )}
      {/* END Mobile Menu */}
    </nav>
  );
};
