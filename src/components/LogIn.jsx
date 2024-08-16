import React, { useEffect, useState } from 'react';
import bgImage from '../assets/images/loginfondo.jpg';
import loginIcon from '../assets/icons/PhUserDuotone.png';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const LogIn = () => {
  console.log('LOGIN component rendered');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLogin, dataLogin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };
  console.log('DATALOGIN: ', dataLogin);
  useEffect(() => {
    if (isLogin) {
      if (
        dataLogin.rol === 'paciente' &&
        window.location.pathname !== '/HomePatient'
      ) {
        navigate('/HomePatient');
      } else if (
        dataLogin.rol === 'psicologo' &&
        window.location.pathname !== '/HomePsico'
      ) {
        navigate('/HomePsico');
      }
    }
  }, [isLogin, navigate, dataLogin.rol]);
  const svgBackground = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="0.42"><defs><linearGradient gradientTransform="rotate(129, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="hsl(290, 83%, 38%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(227, 100%, 50%)" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.003 0.003" numOctaves="2" seed="226" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="77 41" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="screen" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>`;
  return (
    <div
      className="h-[81.2vh] 2xl:h-[86vh] flex items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          svgBackground
        )}")`,
      }}
    >
      {/* <div className="w-1/3 p-2 m-4 bg-black ">soy el div form</div> */}
      <div className="w-1/3 px-8 py-6 border border-gray-300 rounded-lg bg-opacity-90 hover:opacity-90">
        <div className="flex items-center justify-center m-4">
          <div className="flex items-center justify-center w-24 h-24 p-2 m-2 bg-black rounded-full">
            <img src={loginIcon} width={45} height={45} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-px rounded-md shadow-2xl">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-b border-gray- rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border-b border-gray-300 rounded-none bg-inherit rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
