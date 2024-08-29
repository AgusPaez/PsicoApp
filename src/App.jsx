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
import { HomePatient } from './pages/Patient/HomePatient';
import { Patients } from './pages/Psico/Patients';
import { AboutMePatient } from './pages/Patient/AboutMePatient';
import { AppointmentPatient } from './pages/Patient/AppointmentPatient';
// PSICO PAGES
import { HomePsico } from '../src/pages/Psico/HomePsico';
import { MyProfile } from './pages/Psico/MyProfile';
import { ControlPanel } from './pages/Psico/ControlPanel';
import { AppointmentPsico } from './pages/Psico/AppointmentPsico';
// PROTECTED
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        {/* main routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/AboutMe" element={<AboutMe />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/Studies" element={<Studies />} />
        <Route path="/Login" element={<Login />} />
        {/* routes protected with auth "Patient Routes" */}

        <Route
          path="/HomePatient"
          element={
            <ProtectedRoute role="paciente">
              <HomePatient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AboutMePatient"
          element={
            <ProtectedRoute role="paciente">
              <AboutMePatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AppointmentPatient"
          element={
            <ProtectedRoute role="paciente">
              <AppointmentPatient />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/Patients"
          element={
            <ProtectedRoute role="psicologo">
              <Patients />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
