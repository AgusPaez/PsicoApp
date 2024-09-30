//imports
import React, { useState } from 'react';
//import ICONS
import { ControlPanelICON } from '../../assets/icons/ControlPanelICON';
import { AboutMeICON } from '../../assets/icons/AboutMeICON';
import { StudyICON } from '../../assets/icons/StudyICON';
import { PatientsICON } from '../../assets/icons/PatientsICON';
import { AppointmentICON } from '../../assets/icons/AppointmentICON';

export const AsideControlPanel = ({ changeSection, section }) => {
  //Button style
  const buttonClass = (buttonSection) => {
    const isActive = section === buttonSection;
    return `relative z-40 flex items-center justify-center ${
      isActive ? 'w-11/12' : 'w-9/12'
    } gap-3 py-3 transition-all duration-500 border-b border-blue-500 
      hover:scale-y-110 hover:z-50 hover:tracking-widest hover:font-semibold hover:w-11/12 hover:animate-pulse hover:bg-gray-800 hover:bg-opacity-5
      ${
        isActive
          ? 'scale-y-110 z-50 tracking-widest font-bold animate-pulse bg-gray-800 bg-opacity-5'
          : ''
      }`;
  };

  return (
    <aside className="md:w-3/12 my-5 ml-4 border border-blue-500 rounded-xl">
      <div className="flex w-full h-1/4">
        <div className="flex flex-col items-center justify-center w-full p-2 m-4 mt-10 h-1/2 text-white">
          <ControlPanelICON h={'2.5em'} w={'2.5em'} color={'#ffff'} />
          <h1 className="text-lg block mt-2 animate-pulse">CONTROL PANEL</h1>
        </div>
        {/* Buttons section */}
      </div>
      <div className="flex flex-col place-items-center">
        <button className={buttonClass(1)} onClick={() => changeSection(1)}>
          <div className="absolute w-full text-white left-12">
            <AboutMeICON h={30} w={30} color={'#edf0ea'} />
          </div>
          <span>Sobre Mi</span>
        </button>
        <button className={buttonClass(2)} onClick={() => changeSection(2)}>
          <div className="absolute w-full text-white left-12">
            <StudyICON h={30} w={30} color={'#edf0ea'} />
          </div>
          <span> Estudios</span>
        </button>
        <button className={buttonClass(3)} onClick={() => changeSection(3)}>
          <div className="absolute w-full text-white left-12">
            <PatientsICON h={30} w={30} color={'#edf0ea'} />
          </div>
          <span> Pacientes</span>
        </button>
        <button className={buttonClass(4)} onClick={() => changeSection(4)}>
          <div className="absolute w-full text-white left-12">
            <AppointmentICON h={30} w={30} color={'#edf0ea'} />
          </div>
          <span> Citas</span>
        </button>
      </div>
    </aside>
  );
};
