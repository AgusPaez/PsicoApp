//imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import spinner
import { LoadingSpinner } from './LoadingSpinner';
//imports Images
import loginIcon from '../assets/icons/PhUserDuotone.png';
//import context
import { useAuth } from '../context/AuthProvider';
//import Alert
import { Alerts } from './Alerts';

export const LogIn = () => {
  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //context
  const { login, isLogin, dataLogin } = useAuth();
  //navigate
  const navigate = useNavigate();
  // hSumbit function
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setShowAlert(false);
    setTimeout(() => {
      login(email, password, rememberMe);
      setLoading(false);
      setShowAlert(true);
    }, 4000);
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

  // Handles the change in the checkbox
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="flex items-center justify-center flex-grow bg-center bg-cover ">
      <div className="relative w-1/3 px-8 py-6 transition-all duration-700 border border-gray-300 rounded-lg shadow-md shadow-[#6aabff6e] hover:shadow-xl hover:shadow-[#6aabff60] hover:border-gray-400">
        <div className="flex items-center justify-center m-4 ">
          <div className="flex items-center justify-center w-24 h-24 p-2 m-2 bg-[#424242] rounded-full">
            <img src={loginIcon} width={45} height={45} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-px rounded-md">
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
                className="relative rounded-lg hover:tracking-wide block w-full px-3 py-3 text-gray-900 placeholder-[#7a7a7a] focus:placeholder-[#5f5f5f] transition-all duration-500 bg-transparent border-b border-gray-300 shadow-md rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm hover:shadow-lg hover:border-gray-400"
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
                className="relative mt-2 rounded-lg hover:tracking-wide block w-full px-3 py-3 text-gray-900 placeholder-[#7a7a7a] focus:placeholder-[#5f5f5f] transition-all duration-700 bg-transparent border-b border-gray-300 shadow-md rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm hover:shadow-lg hover:border-gray-400"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <label className="cursor-pointer">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="hidden peer"
                />
                <span className="top-1 inline-block relative h-5 w-5 bg-black rounded-full peer-checked:shadow-[0px_0px_30px_#09f] peer-checked:after:opacity-100 after:content-[''] after:absolute after:border-solid  after:border-r-0 after:border-b-0 after:border-[0.2em] after:w-[0.5em] after:h-[0.7em] after:left-[0.39em] after:top-[0.18em]  after:border-[#6aabff] after:rotate-[210deg] after:opacity-0 after:transition-opacity after:duration-300 after:ease transition-all duration-700 "></span>

                <label
                  htmlFor="remember-me"
                  id="remember-me"
                  name="remember-me"
                  className=" ml-2 text-sm text-[#7a7a7a] hover:text-[#5f5f5f] hover:tracking-wide transition-all duration-700 "
                >
                  Recordarme
                </label>
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

          <div className="flex justify-center ">
            <button
              type="submit"
              className="relative flex justify-center w-3/5 px-4 py-3 mb-4 text-sm font-medium hover:font-bold tracking-wide hover:tracking-wider transition-all duration-700 text-white bg-[#666666] border border-transparent rounded-md group hover:bg-[#424242] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
        {loading && (
          <div className="mt-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
      {showAlert && (
        <Alerts
          section={'login'}
          condition={'error'}
          title={'Credenciales incorrectas'}
          message={
            'El usuario o la contraseña son incorrectos. Por favor, inténtalo de nuevo.'
          }
          time={5500}
        />
      )}
    </div>
  );
};
