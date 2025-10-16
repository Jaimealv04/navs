import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Loader2,
  X,
  Coffee,
  Wine,
  UtensilsCrossed
} from 'lucide-react';
import { useAuthWithServices } from '../hooks/useAuthWithServices';

type AuthMode = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, isAuthenticated, isLoading, error, clearError, user } = useAuthWithServices();
  const navigate = useNavigate();
  
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [localErrors, setLocalErrors] = useState<{[key: string]: string}>({});

  // Cerrar modal y redirigir si el usuario se autentica exitosamente
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Usuario autenticado:', user);
      onClose();
      
      // Redirigir a admin si es administrador
      if (user.role === 'ADMIN') {
        console.log('Redirigiendo a admin...');
        navigate('/admin', { replace: true });
      } else {
        console.log('Usuario normal, permaneciendo en la página actual');
      }
    }
  }, [isAuthenticated, user, onClose, navigate]);

  // Limpiar errores cuando cambia el modo o se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      clearError();
      setLocalErrors({});
    }
  }, [authMode, isOpen, clearError]);

  // Resetear formulario cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
      });
      setLocalErrors({});
      setAuthMode('login');
      setShowPassword(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    // Validar email
    if (!formData.email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    // Validar contraseña
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      console.log('Intentando hacer login...');
      const response = await login({
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login exitoso, respuesta:', response);
    } catch (err) {
      // El error se maneja en el hook
      console.error('Error de autenticación:', err);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (localErrors[field]) {
      setLocalErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Función switchMode eliminada ya que solo tenemos modo login

  const renderFloatingIcon = (Icon: React.ElementType, delay: number) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0.2, 0.4, 0.2],
        y: [0, -15, 0],
        rotate: [0, 3, -3, 0]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute text-yellow-400/20"
    >
      <Icon size={20} />
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
        >
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top left */}
            <div className="absolute top-4 left-4">
              {renderFloatingIcon(Coffee, 0)}
            </div>
            
            {/* Top right */}
            <div className="absolute top-6 right-6">
              {renderFloatingIcon(Wine, 1)}
            </div>
            
            {/* Bottom left */}
            <div className="absolute bottom-6 left-6">
              {renderFloatingIcon(UtensilsCrossed, 2)}
            </div>
            
            {/* Bottom right */}
            <div className="absolute bottom-4 right-4">
              {renderFloatingIcon(Coffee, 3)}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 mb-3">
                <UtensilsCrossed className="text-yellow-400" size={32} />
                <h2 className="text-2xl font-bold text-white">EGO HOUSE</h2>
              </div>
              <p className="text-gray-300">
                {authMode === 'login' ? 'Bienvenido de vuelta' : 'Únete a nosotros'}
              </p>
            </div>

            {/* Admin Login Header - Solo modo login */}
            <div className="text-center mb-6">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2">
                  <LogIn size={16} className="text-yellow-400" />
                  <span className="text-white font-medium">Acceso Administrativo</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                      localErrors.email ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                    }`}
                    placeholder="admin@egohouse.com"
                  />
                </div>
                {localErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{localErrors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                      localErrors.password ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {localErrors.password && (
                  <p className="text-red-400 text-sm mt-1">{localErrors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Acceder</span>
                  </>
                )}
              </button>
            </form>

            {/* Admin Info */}
            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <p className="text-yellow-400 text-sm text-center">
                <strong>Acceso exclusivo para administradores</strong>
              </p>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">
                Panel de administración - EGO HOUSE
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;