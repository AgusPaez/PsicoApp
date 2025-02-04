//imports
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//Icons
import MenuIcon from '../../assets/icons/MenuIcon';
//images
import SymbolPsico from '../../assets/icons/pngwing.com.png';
import NotificationsIcon from '../../assets/icons/NotificationsIcon';
//import context
import { useAuth } from '../../context/AuthProvider';

export const NavbarPatient = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  //States
  const [openMenu, setOpenMenu] = useState(false);
  const [optionsProfile, setOptionsProfile] = useState(false);
  const buttonClass = (path) => `${
    isActive(path) ? 'bg-[#534949d8] tracking-widest' : ''
  } 
`;
  //context
  const { login, isAuthenticated, user, logout, dataLogin } = useAuth();
  //open menu function
  const showMenu = () => {
    setOpenMenu(!openMenu);
  };
  const openOptionsProfile = () => {
    setOptionsProfile(!optionsProfile);
  };
  const Redirecto = () => {
    navigate('/HomePatient');
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-[#7a6b6bd8]  via-[#949191] via-50% to-[#7a6b6bd8]  text-[#8b4513] z-40 relative opacity-90">
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
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
                  onClick={Redirecto}
                  className="h-10 xl:h-16 w-auto xl:absolute cursor-pointer xl:-left-[8vh] 2xl:-left-[18vh] drop-shadow-sm hover:drop-shadow-xl transition-all duration-200"
                  src={SymbolPsico}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="/AboutMePatient"
                    className={
                      buttonClass('/AboutMePatient') +
                      'text-gray-300  hover:bg-[#534949d8] hover:text-white rounded-md px-3 py-2 text-base font-medium hover:tracking-widest transition-all duration-300'
                    }
                    aria-current="page"
                  >
                    Sobre Mi
                  </a>
                  <a
                    href="/AppointmentPatient"
                    className={
                      buttonClass('/AppointmentPatient') +
                      'text-gray-300  hover:bg-[#534949d8] hover:text-white rounded-md px-3 py-2 text-base font-medium hover:tracking-widest transition-all duration-300'
                    }
                  >
                    Citas
                  </a>
                  {/* <a
                    href="/Studies"
                    className={
                      buttonClass('/Studies') +
                      'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                  >
                    Estudios
                  </a> */}
                  <a
                    onClick={logout}
                    className={
                      buttonClass('/Login') +
                      'text-gray-300 cursor-pointer- hover:bg-[#463d3dd8] hover:text-white rounded-md px-3 py-2 text-base font-medium hover:tracking-widest transition-all duration-300'
                    }
                  >
                    Salir
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
                <NotificationsIcon />
              </button>
              {/* END Notifications */}
              {/* Profile  */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
                    className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <a
                      href="/AboutMePatient"
                      className="z-50 block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-slate-400 "
                      role="menuitem"
                      id="user-menu-item-0"
                    >
                      Ver perfil
                    </a>

                    <a
                      href="#"
                      className="z-50 block px-4 py-2 text-sm text-gray-700  hover:bg-slate-400"
                      role="menuitem"
                      id="user-menu-item-2"
                      onClick={logout}
                    >
                      Cerrar Sesion
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-[#7a6b6bd8]  via-[#949191] via-50% to-[#7a6b6bd8] ">
              <a
                href="/AboutMePatient"
                className={
                  buttonClass('/AboutMePatient') +
                  'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                }
                aria-current="page"
              >
                Sobre Mi
              </a>
              <a
                href="/AppointmentPatient"
                className={
                  buttonClass('/AppointmentPatient') +
                  'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                }
              >
                Citas
              </a>
              {/* <a
                href="/Studies"
                className={
                  buttonClass('/Studies') +
                  'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                }
              >
                Estudios
              </a> */}
              <a
                onClick={logout}
                className={
                  buttonClass('/Login') +
                  'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                }
              >
                Salir
              </a>
            </div>
          </div>
        )}
        {/* END Mobile Menu */}
      </nav>
    </>
  );
};
