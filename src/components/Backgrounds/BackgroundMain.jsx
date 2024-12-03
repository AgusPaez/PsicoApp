import React from 'react';
// import svgBackground from '../../assets/images/fondops.svg';
import svgBackground from '../../assets/images/BGDEF.png';

export const BackgroundMain = ({ children }) => {
  return (
    <div
      className="flex flex-col bg-center bg-cover min-h-dvh"
      style={{
        backgroundImage: `url(${svgBackground})`,
      }}
    >
      {children}
    </div>
  );
};
