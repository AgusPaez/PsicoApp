import React, { useState } from 'react';
// Import icons
import { ControlPanelICON } from '../../assets/icons/ControlPanelICON';
import { AboutMeICON } from '../../assets/icons/AboutMeICON';
import { StudyICON } from '../../assets/icons/StudyICON';
import { PatientsICON } from '../../assets/icons/PatientsICON';
import { AppointmentICON } from '../../assets/icons/AppointmentICON';

export const AsideControlPanel = ({ changeSection, section }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Button styles
  const buttonClass = (buttonSection) => {
    const isActive = section === buttonSection;
    return `relative z-40 flex items-center justify-center ${
      isActive ? 'w-11/12' : 'w-9/12'
    } my-3 lg:my-0 gap-3 py-3 transition-all duration-500 border-b border-blue-500
      hover:scale-y-110 hover:z-50 hover:tracking-widest hover:font-semibold hover:w-11/12 hover:animate-pulse hover:bg-gray-800 hover:bg-opacity-5
      ${
        isActive
          ? 'scale-y-105 z-50 tracking-widest font-bold animate-pulse bg-gradient-to-r from-[#4e407500] from-30% via-[#473a6b] via-50% to-[#4e407500] to-70% '
          : ''
      }`;
  };

  return (
    <div className="w-full px-4 md:px-0 md:w-3/12">
      {/* Toggle Button (visible only on mobile) */}
      <button
        onClick={toggleAccordion}
        className="block w-full h-12 px-4 py-2 font-semibold text-white transition-all rounded-t-lg shadow-md md:hidden hover:bg-blue-300"
      >
        <div className="flex items-center justify-between">
          <span>{isOpen ? 'Cerrar Panel' : 'Abrir Panel'}</span>
          <svg
            className={`transition-transform duration-300 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="1.5em"
            height="1.5em"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="12" y1="5" x2="12" y2="19" />
          </svg>
        </div>
      </button>
      {/* Accordion aside (visible only on mobile) */}
      <aside
        className={`block md:hidden  bg-gradient-to-r from-[#fff0] via-[#4e4075] to-[#fff0] border border-blue-500 rounded-xl overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="my-5 ml-4 ">
          <div className="flex w-full h-1/4">
            <div className="flex flex-col items-center justify-center w-full p-2 m-4 mt-2 text-white h-1/2">
              <ControlPanelICON h={'2.5em'} w={'2.5em'} color={'#ffff'} />
              <h1 className="mt-2 text-lg md:block animate-pulse">
                CONTROL PANEL
              </h1>
            </div>
          </div>
          <div className="flex flex-col place-items-center">
            <button className={buttonClass(1)} onClick={() => changeSection(1)}>
              <div className="absolute w-full text-white left-6 md:left-12">
                <AboutMeICON h={30} w={30} color={'#edf0ea'} />
              </div>
              <span className="text-lg md:block">Sobre Mi</span>
            </button>
            <button className={buttonClass(2)} onClick={() => changeSection(2)}>
              <div className="absolute w-full text-white lg:left-12">
                <StudyICON h={30} w={30} color={'#edf0ea'} />
              </div>
              <span className="text-lg md:block">Estudios</span>
            </button>
            <button className={buttonClass(3)} onClick={() => changeSection(3)}>
              <div className="absolute w-full text-white left-6 md:left-12">
                <PatientsICON h={30} w={30} color={'#edf0ea'} />
              </div>
              <span className="text-lg md:block">Pacientes</span>
            </button>
            {/* <button className={buttonClass(4)} onClick={() => changeSection(4)}>
              <div className="absolute w-full text-white left-6 md:left-12">
                <AppointmentICON h={30} w={30} color={'#edf0ea'} />
              </div>
              <span className="text-lg md:block">Citas</span>
            </button> */}
          </div>
        </div>
      </aside>

      {/* Default aside (visible on md and larger) */}
      <aside className="hidden md:block my-5 ml-4 border  border-blue-500 h-[87.2vh] rounded-xl bg-gradient-to-r from-[#fff0] via-[#4e4075] to-[#fff0]">
        <div className="flex w-full ">
          <div className="flex flex-col items-center justify-center w-full p-2 m-4 mt-10 text-white h-1/2">
            <ControlPanelICON h={'2.5em'} w={'2.5em'} color={'#ffff'} />
            <h1 className="hidden mt-2 text-xs lg:text-lg md:block animate-pulse">
              CONTROL PANEL
            </h1>
          </div>
        </div>
        <div className="flex flex-col place-items-center">
          <button className={buttonClass(1)} onClick={() => changeSection(1)}>
            <div className="absolute w-full text-white left-6 md:left-12">
              <AboutMeICON h={30} w={30} color={'#edf0ea'} />
            </div>
            <span className="text-xs lg:text-base md:block">Sobre Mi</span>
          </button>
          <button className={buttonClass(2)} onClick={() => changeSection(2)}>
            <div className="absolute w-full text-white lg:left-12">
              <StudyICON h={30} w={30} color={'#edf0ea'} />
            </div>
            <span className="text-xs lg:text-base md:block">Estudios</span>
          </button>
          <button className={buttonClass(3)} onClick={() => changeSection(3)}>
            <div className="absolute w-full text-white left-6 md:left-12">
              <PatientsICON h={30} w={30} color={'#edf0ea'} />
            </div>
            <span className="text-xs lg:text-base md:block">Pacientes</span>
          </button>
          {/* <button className={buttonClass(4)} onClick={() => changeSection(4)}>
            <div className="absolute w-full text-white left-6 md:left-12">
              <AppointmentICON h={30} w={30} color={'#edf0ea'} />
            </div>
            <span className="text-xs lg:text-base md:block">Citas</span>
          </button> */}
        </div>
      </aside>
    </div>
  );
};
