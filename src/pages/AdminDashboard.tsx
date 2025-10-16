import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Calendar,
  LogOut,
  Users,
  UtensilsCrossed,
  Plus,
  Edit,
  Trash2,
  ChefHat,
  ArrowLeft
} from 'lucide-react';
import { useAuthWithServices } from '../hooks/useAuthWithServices';
import MenuManagement from '../components/admin/MenuManagement';

type AdminSection = 'menu' | 'reservas' | null;

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuthWithServices();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderHeader = () => (
    <div className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 p-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <ChefHat className="text-yellow-400" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
              <p className="text-gray-400">EGO HOUSE</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium">{user?.name}</p>
            <p className="text-gray-400 text-sm">Administrador</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMainMenu = () => (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Qué deseas administrar?
          </h2>
          <p className="text-gray-400">
            Selecciona una opción para comenzar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Modificación de Carta */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setActiveSection('menu')}
            className="group cursor-pointer"
          >
            <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/10 rounded-full mb-6 group-hover:bg-yellow-400/20 transition-colors">
                  <UtensilsCrossed className="text-yellow-400" size={40} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Modificación de Carta
                </h3>
                
                <p className="text-gray-400 mb-6">
                  Gestiona categorías, productos, precios y disponibilidad del menú
                </p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <Plus size={16} />
                    <span>Agregar productos</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Edit size={16} />
                    <span>Editar categorías</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Trash2 size={16} />
                    <span>Eliminar elementos</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gestión de Reservas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setActiveSection('reservas')}
            className="group cursor-pointer"
          >
            <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/10 rounded-full mb-6 group-hover:bg-yellow-400/20 transition-colors">
                  <Calendar className="text-yellow-400" size={40} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Gestión de Reservas
                </h3>
                
                <p className="text-gray-400 mb-6">
                  Administra reservas de mesas, eventos y disponibilidad
                </p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <Users size={16} />
                    <span>Ver reservas</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar size={16} />
                    <span>Gestionar horarios</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Settings size={16} />
                    <span>Configurar mesas</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const renderMenuManagement = () => (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver al panel principal</span>
          </button>
          
          <h2 className="text-3xl font-bold text-white">
            Modificación de Carta
          </h2>
          <p className="text-gray-400 mt-2">
            Gestiona el catálogo de productos y categorías
          </p>
        </motion.div>

        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8">
          <MenuManagement onBack={() => setActiveSection(null)} />
        </div>
      </div>
    </div>
  );

  const renderReservationManagement = () => (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver al panel principal</span>
          </button>
          
          <h2 className="text-3xl font-bold text-white">
            Gestión de Reservas
          </h2>
          <p className="text-gray-400 mt-2">
            Administra reservas y disponibilidad de mesas
          </p>
        </motion.div>

        {/* Aquí irá el componente de gestión de reservas */}
        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8">
          <div className="text-center text-gray-400">
            <Calendar size={48} className="mx-auto mb-4" />
            <p>Componente de gestión de reservas en desarrollo...</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      {renderHeader()}
      
      {activeSection === null && renderMainMenu()}
      {activeSection === 'menu' && renderMenuManagement()}
      {activeSection === 'reservas' && renderReservationManagement()}
    </div>
  );
};

export default AdminDashboard;