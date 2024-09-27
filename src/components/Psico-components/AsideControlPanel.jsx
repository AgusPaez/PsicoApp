import React from 'react';

export const AsideControlPanel = ({ changeSection }) => {
  return (
    <aside
      style={{
        // borderRight: '4px solid', // Aplica el borde derecho
        borderImage: 'linear-gradient(to bottom, #5b45ff, #7d65bf) 1', // Aplica el gradiente solo al borde derecho
      }}
      className="w-3/12 h-full border-l-[18px] "
    >
      <div className="h-12"> </div>
      <div className="h-12 text-center">Control panel</div>
      <div className="h-12"></div>
      <div className="flex flex-col">
        <button
          className="z-40 py-3 my-px transition-all duration-300 bg-gradient-to-r from-[#644cf4] from-60% to-[#7d65bf00]  hover:scale-y-125 hover:z-50 hover:tracking-wide"
          onClick={() => changeSection(1)}
        >
          Seccion: "Sobre Mi"
        </button>
        <button
          className="z-40 py-3 my-px transition-all duration-300 bg-gradient-to-r from-[#644cec] from-50% to-[#7d65bf00]  hover:scale-y-125 hover:z-50  hover:tracking-wide"
          onClick={() => changeSection(2)}
        >
          Seccion: "Estudios"
        </button>
        <button
          className="z-40 py-3 my-px transition-all duration-300 bg-gradient-to-r from-[#6c54ec] from-40% to-[#7d65bf00] hover:scale-y-125 hover:z-50  hover:tracking-wide"
          onClick={() => changeSection(3)}
        >
          Seccion: "Pacientes"
        </button>
        <button
          className="z-40 py-3 my-px transition-all duration-300 bg-gradient-to-r from-[#6c54e4] from-30% to-[#7d65bf00]  hover:scale-y-125 hover:z-50 hover:tracking-wide "
          onClick={() => changeSection(4)}
        >
          Seccion: "Citas"
        </button>
      </div>
    </aside>
  );
};
