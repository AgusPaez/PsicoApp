import React, { useEffect, useState } from 'react';
//images
import graduadoItem from '../assets/icons/graduado.png';
//imports services
import { fetchAllStudies } from '../services/StudiesService';
// import components
import { SliderTitles } from '../components/SliderTitles';

export const StudiesComponent = () => {
  //state use for studies
  const [studies, setStudies] = useState([]);
  //fetch studies
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        // call service
        const studies = await fetchAllStudies();
        // update studies
        setStudies(studies);
      } catch (error) {
        console.error('Error fetching studies', error);
      }
    };
    fetchStudies();
  }, []);

  return (
    <>
      <section className="h-[100vh] bg-slate-300">
        <div className="grid h-1/3">
          <div className="flex items-center justify-center p-2 m-2 mt-20">
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="53.245 47.211 93.512 105.578"
              viewBox="53.245 47.211 93.512 105.578"
              height="75"
              width="75"
              xmlns="http://www.w3.org/2000/svg"
              data-type="tint"
              role="presentation"
              aria-hidden="true"
            >
              <g>
                <path
                  d="M100 47.211L53.245 79.502v10.287H61.5v7h4.104v36.003l6.376-10.255 6.417 10.647V96.789H82.5v-7h7v7h4.104v36.003l6.376-10.255 6.417 10.647V96.789h4.104v-7h7v7h4.104v36.003l6.376-10.255 6.417 10.647V96.789h4.104v-7h8.255V79.501L100 47.211zm-24.604 75.183l-3.376-5.603-3.417 5.495V96.789h6.793v25.605zM79.5 93.789h-15v-4h15v4zm23.896 28.605l-3.376-5.603-3.417 5.495V96.789h6.793v25.605zm4.104-28.605h-15v-4h15v4zm23.896 28.605l-3.376-5.603-3.417 5.495V96.789h6.793v25.605zm4.104-28.605h-15v-4h15v4zm8.255-7h-87.51v-5.713L100 50.856l43.755 30.219v5.714z"
                  fill="#B3A8B0"
                ></path>
                <path
                  d="M141.5 135.789h-83v7h-5v10h93v-10h-5v-7zm-80 3h77v4h-77v-4zm82 7v4h-87v-4h87z"
                  fill="#B3A8B0"
                ></path>
                <path
                  d="M93.5 72.289c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5-6.5 2.916-6.5 6.5zm10 0c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5z"
                  fill="#B3A8B0"
                ></path>
              </g>
            </svg>
          </div>
          <div>
            <h2 className="flex items-center justify-center p-0 mt-4 text-3xl">
              Lic. Antonella Rabiti
            </h2>
          </div>
          <div>
            <h2 className="flex items-center justify-center mt-2 text-2xl">
              Psicologia Clinica
            </h2>
          </div>
        </div>
        <div className="h-auto ">
          <h2 className="flex items-center justify-center p-2 mt-8 mb-6 text-base">
            Formación
          </h2>
          <div className="">
            <ul>
              {studies.map((study) => (
                <li
                  key={study._id}
                  className="flex items-center justify-center p-0 m-0"
                >
                  <img src={graduadoItem} height={20} width={20}></img>
                  <a className="flex items-center justify-center m-0 my-1 ml-4 text-lg">
                    {study.titulo}, {study.institucion} ({study.anio})
                  </a>
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SliderTitles></SliderTitles>
        <div className="h-auto my-8 ">CAROUSEL CON IMAGENES</div>
      </section>
    </>
  );
};
