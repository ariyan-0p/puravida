import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import TripDetail from './pages/TripDetail';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/bhutan" element={<TripDetail tripSlug="bhutan" />} />
        <Route path="/japan" element={<TripDetail tripSlug="japan" />} />
        <Route path="/jordan" element={<TripDetail tripSlug="jordan" />} />
        <Route path="/sri-lanka" element={<TripDetail tripSlug="srilanka" />} />
      </Routes>
    </BrowserRouter>
  );
}