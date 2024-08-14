import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
//Imports Pages
// MAIN PAGES
import { Home } from '../src/pages/Main/Home';
import { AboutMe } from '../src/pages/Main/AboutMe';
import { Appointment } from '../src/pages/Main/Appointment';
import { Login } from '../src/pages/Main/Login';
import { Studies } from '../src/pages/Main/Studies';
// PATIENT PAGES
// PSICO PAGES
import { HomePsico } from '../src/pages/Psico/HomePsico';
import { MyProfile } from './pages/Psico/MyProfile';
import { ControlPanel } from './pages/Psico/ControlPanel';
import { AppointmentPsico } from './pages/Psico/AppointmentPsico';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutMe" element={<AboutMe />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/Studies" element={<Studies />} />
        <Route path="/Login" element={<Login />} />
        {/* routes protected with auth "Patient Routes" */}
        {/* routes protected with auth "Psico Routes" */}
        <Route
          path="/HomePsico"
          element={
            <ProtectedRoute role="psicologo">
              <HomePsico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MyProfile"
          element={
            <ProtectedRoute role="psicologo">
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AppointmentPsico"
          element={
            <ProtectedRoute role="psicologo">
              <AppointmentPsico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ControlPanel"
          element={
            <ProtectedRoute role="psicologo">
              <ControlPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
