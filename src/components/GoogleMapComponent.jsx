import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY; // Asegúrate de que esté configurado correctamente
const KEY = 'AIzaSyBVnJAPm2RZjFFIn-OzX7T8hR101HIF3Ic';

const GoogleMapComponent = () => {
  const containerStyle = {
    width: '100%',
    height: '350px',
  };

  const center = {
    lat: -31.547413879002796,
    lng: -68.52316621689451,
  };

  return (
    <LoadScript googleMapsApiKey={KEY}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 m-2 border-y-2  gap-6 relative my-16 border-t-2 md:mx-28 border-[#8cabe7]">
        {/* Sección de ubicación y horarios */}
        <div className="flex flex-col items-center justify-center w-full h-full py-2 my-2 lg:w-2/3">
          <h1 className="p-2 mb-10 text-3xl font-semibold text-center h-1/3 md:text-start">
            Ubicación y Horarios
          </h1>
          <span className="p-2 text-lg text-center h-1/3">
            Lun - Vie (16hs - 21hs)
          </span>
          <span className="mt-2 text-base text-center text-gray-600">
            Encontrame en esta ubicación
          </span>
        </div>

        {/* Mapa de Google */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          mapContainerClassName="w-full lg:w-2/5 h-96 rounded-2xl shadow-lg border-2 border-[#8cabe7]"
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;
