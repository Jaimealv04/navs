import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import FullMenuPage from './pages/FullMenuPage';
import ShishaPage from './pages/ShishaPage';
import GaleriaCachimbas from './pages/GaleriaCachimbas';
import LocalPage from './pages/LocalPage';
import DesayunosPage from './pages/DesayunosPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu/general" element={<FullMenuPage />} />
        <Route path="/menu/:categorySlug" element={<MenuPage />} />
        <Route path="/shisha" element={<ShishaPage />} />
        <Route path="/galeria-cachimbas" element={<GaleriaCachimbas />} />
        <Route path="/local" element={<LocalPage />} />
        <Route path="/desayunos" element={<DesayunosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
