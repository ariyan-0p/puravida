import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BhutanJourney from './pages/BhutanJourney';
import LadakhJourney from './pages/LadakhJourney';
import ComingSoon from './pages/ComingSoon';
import AboutHarsha from './pages/AboutHarsha';
import Pilates from './pages/Pilates';
import Contact from './pages/Contact';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/bhutan" element={<BhutanJourney />} />
        <Route path="/ladakh" element={<LadakhJourney />} />
        <Route path="/bali" element={<ComingSoon slug="bali" />} />
        <Route path="/japan" element={<ComingSoon slug="japan" />} />
        <Route path="/about" element={<AboutHarsha />} />
        <Route path="/pilates" element={<Pilates />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
