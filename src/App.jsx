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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/Studies" element={<Studies />} />
          <Route path="/Login" element={<Login />} />
          {/* routes protected with auth "Patient Routes" */}
          {/* routes protected with auth "Psico Routes" */}
          <Route path="/HomePsico" element={<HomePsico />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/AppointmentPsico" element={<AppointmentPsico />} />
          <Route path="/ControlPanel" element={<ControlPanel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
