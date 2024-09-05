//imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//imports Images
import loginIcon from '../assets/icons/PhUserDuotone.png';
//import context
import { useAuth } from '../context/AuthProvider';

export const LogIn = () => {
  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //context
  const { login, isLogin, dataLogin } = useAuth();
  //navigate
  const navigate = useNavigate();
  // hSumbit function
  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    // if login redirect to the corresponding route
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

  return (
    <div className="flex items-center justify-center flex-grow bg-center bg-cover ">
      <div className="relative w-1/3 px-8 py-6 transition-all duration-700 border border-gray-300 rounded-lg shadow-md hover:shadow-xl hover:border-gray-400">
        <div className="flex items-center justify-center m-4 ">
          <div className="flex items-center justify-center w-24 h-24 p-2 m-2 bg-[#424242] rounded-full">
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
                className="relative hover:tracking-wide block w-full px-3 py-3 text-gray-900 placeholder-[#7a7a7a] focus:placeholder-[#5f5f5f] transition-all duration-500 bg-transparent border-b border-gray-300 shadow-md rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm hover:shadow-lg hover:border-gray-400"
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
                className="relative  hover:tracking-wide block w-full px-3 py-3 text-gray-900 placeholder-[#7a7a7a] focus:placeholder-[#5f5f5f] transition-all duration-700 bg-transparent border-b border-gray-300 shadow-md rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm hover:shadow-lg hover:border-gray-400"
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
                className="w-4 h-4 text-[#7a7a7a] border-gray-300 rounded-full focus:ring-[#7a7a7a] focus:ring-1 cursor-pointer transition-all duration-700 hover:h-[18px] hover:w-[18px]"
              />

              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-[#7a7a7a]"
              >
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[#7a7a7a] hover:text-[#5f5f5f] hover:tracking-wide hover:underline pr-2 transition-all duration-700 "
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 mb-4 text-sm font-medium hover:font-bold tracking-wide hover:tracking-wider transition-all duration-700 text-white bg-[#666666] border border-transparent rounded-md group hover:bg-[#424242] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
