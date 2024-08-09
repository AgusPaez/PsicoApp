import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//Icons
import MenuIcon from '../assets/icons/MenuIcon';
//images
import SymbolPsico from '../assets/icons/pngwing.com.png';
import NotificationsIcon from '../assets/icons/NotificationsIcon';

export const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  //States
  const [openMenu, setOpenMenu] = useState(false);
  const [optionsProfile, setOptionsProfile] = useState(false);
  const buttonClass = (path) => `${isActive(path) ? 'bg-gray-700' : ''} 
`;
  //open menu function
  const showMenu = () => {
    setOpenMenu(!openMenu);
  };
  const openOptionsProfile = () => {
    setOptionsProfile(!optionsProfile);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-zinc-500 to-purple-300">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={showMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <MenuIcon />

                <svg
                  className="hidden h-6 w-6"
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
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center ">
                <img
                  className="h-10 xl:h-16 w-auto xl:absolute  xl:-left-[8vh] 2xl:-left-[18vh]"
                  src={SymbolPsico}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Cuando esta seleccionado Current: "bg-gray-900 text-white" */}
                  <a
                    href="/AboutMe"
                    className={
                      buttonClass('/AboutMe') +
                      'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                    aria-current="page"
                  >
                    Sobre Mi
                  </a>
                  <a
                    href="/Appointment"
                    className={
                      buttonClass('/Appointment') +
                      'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                  >
                    Citas
                  </a>
                  <a
                    href="/Studies"
                    className={
                      buttonClass('/Studies') +
                      'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                  >
                    Estudios
                  </a>
                  <a
                    href="/Login"
                    className={
                      buttonClass('/Login') +
                      'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Notifications */}
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <NotificationsIcon />
              </button>
              {/* END Notifications */}
              {/* Profile  */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={openOptionsProfile}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Foto de perfil"
                    />
                  </button>
                </div>
                {/* END Profile */}
                {/* 
          <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}

                {/*  PROFILE OPTIONS  */}
                {optionsProfile && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*  END PROFILE OPTIONS  */}

        {/* Mobile Menu */}
        {openMenu && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
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
    </>
  );
};
