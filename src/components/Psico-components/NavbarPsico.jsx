//imports
import React, { useState } from 'react';
//import context
import { useAuth } from '../../context/AuthProvider';
//import icons
import SymbolPsico from '../../assets/icons/pngwing.com.png';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavbarPsico = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [openMenu, setOpenMenu] = useState(false);
  const [optionsProfile, setOptionsProfile] = useState(false);
  const { logout, dataLogin } = useAuth();
  const navigate = useNavigate();

  const showMenu = () => {
    setOpenMenu(!openMenu);
    console.log('ESTADO:', openMenu);
  };
  const openOptionsProfile = () => {
    setOptionsProfile(!optionsProfile);
    console.log('PROFILE', optionsProfile);
  };
  const Redirecto = () => {
    navigate('/HomePsico');
  };

  const buttonClass = (path) => `${
    isActive(path) ? 'bg-gray-700 text-white tracking-wider' : ''
  } 
`;

  return (
    <>
      <nav className="bg-gradient-to-r from-[#5b45ff] to-[#7d65bf]">
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-[8vh]">
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
                <svg
                  className="block w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

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
                  onClick={Redirecto}
                  className="h-10 xl:h-16 w-auto xl:absolute  xl:-left-[8vh] 2xl:-left-[18vh]"
                  src={SymbolPsico}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="/MyProfile"
                    className={
                      buttonClass('/MyProfile') +
                      'hover:bg-gray-700  hover:text-white rounded-md px-[0.80rem] py-[0.60rem] text-base hover:tracking-wider font-medium transition-all duration-500'
                    }
                    aria-current="page"
                  >
                    Mi perfil
                  </a>
                  <a
                    href="/AppointmentPsico"
                    className={
                      buttonClass('/AppointmentPsico') +
                      'hover:bg-gray-700  hover:text-white rounded-md px-[0.80rem] py-[0.60rem] text-base hover:tracking-wider font-medium transition-all duration-500'
                    }
                  >
                    Citas
                  </a>
                  <a
                    href="/Patients"
                    className={
                      buttonClass('/Patients') +
                      'hover:bg-gray-700  hover:text-white rounded-md px-[0.80rem] py-[0.60rem] text-base hover:tracking-wider font-medium transition-all duration-500'
                    }
                  >
                    Pacientes
                  </a>
                  <a
                    href="/ControlPanel"
                    className={
                      buttonClass('/ControlPanel') +
                      'hover:bg-gray-700  hover:text-white rounded-md px-[0.80rem] py-[0.60rem] text-base hover:tracking-wider font-medium transition-all duration-500'
                    }
                  >
                    Panel de control
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Notifications */}
              <button
                type="button"
                className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
              {/* END Notifications */}
              {/* Profile  */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={openOptionsProfile}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={dataLogin.imagenUrl}
                      alt="Foto de perfil"
                    />
                  </button>
                </div>
                {/* END Profile */}
                {/*  PROFILE OPTIONS  */}
                {optionsProfile && (
                  <div
                    className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <a
                      href="/MyProfile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-400"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-400"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <a
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-slate-400"
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
            <div className="px-2 pt-2 pb-3 space-y-1 ">
              <a
                href="/MyProfile"
                className={
                  buttonClass('/MyProfile') +
                  'block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-gray-700 hover:text-white'
                }
                aria-current="page"
              >
                Mi perfil
              </a>
              <a
                href="/AppointmentPsico"
                className={
                  buttonClass('/AppointmentPsico') +
                  'block px-3 py-2 text-base font-medium  text-white rounded-md hover:bg-gray-700 hover:text-white'
                }
              >
                Citas
              </a>
              <a
                href="/Patients"
                className={
                  buttonClass('/Patients') +
                  'block px-3 py-2 text-base font-medium  text-white rounded-md hover:bg-gray-700 hover:text-white'
                }
              >
                Pacientes
              </a>

              <a
                href="/ControlPanel"
                className={
                  buttonClass('/ControlPanel') +
                  'block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-gray-700 hover:text-white'
                }
              >
                Panel de Control
              </a>
            </div>
          </div>
        )}
        {/* END Mobile Menu */}
      </nav>
    </>
  );
};
