import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import LandingPage from './pages/LandingPage';
import FullMenuPage from './pages/FullMenuPage';
import ShishaPage from './pages/ShishaPage';
import GaleriaCachimbas from './pages/GaleriaCachimbas';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LocalPage from './pages/LocalPage';
import TableManagement from './pages/TableManagement';
import DesayunosPage from './pages/DesayunosPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          {/* Rutas públicas - accesibles sin autenticación */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu/general" element={<FullMenuPage />} />
          {/* <Route path="/menu/:categorySlug" element={<MenuPage />} /> */}
          <Route path="/shisha" element={<ShishaPage />} />
          <Route path="/galeria-cachimbas" element={<GaleriaCachimbas />} />
          <Route path="/local" element={<LocalPage />} />      
          <Route path="/desayunos?egohouse" element={<DesayunosPage />} />

          {/* Rutas protegidas - requieren autenticación */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tables" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <TableManagement />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
