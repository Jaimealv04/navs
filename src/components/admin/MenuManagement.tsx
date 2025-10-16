import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  X,
  Loader2,
  AlertTriangle,
  CheckCircle,
  UtensilsCrossed
} from 'lucide-react';
import { CatalogService } from '../../services';
import type { Category, AddItemRequest } from '../../types';

type ModalType = 'item' | null;

interface MenuManagementProps {
  onBack: () => void;
}

const MenuManagement: React.FC<MenuManagementProps> = ({ }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  // Modal states
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  
  // Form states
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    subcategoryName: '',
    subsectionName: ''
  });

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Handle body scroll when modal is open
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalType]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalType) {
        closeModal();
      }
    };

    if (modalType) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalType]);

  // Handle body scroll when modal is open
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalType]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalType) {
        closeModal();
      }
    };

    if (modalType) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalType]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await CatalogService.getAllCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setError(message);
      setTimeout(() => setError(''), 5000);
    } else {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 3000);
    }
  };



  // Item operations
  const openItemModal = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setItemForm({ name: '', description: '', price: '', subcategoryName: '', subsectionName: '' });
    setModalType('item');
  };

  const saveItemHandler = async () => {
    try {
      setLoading(true);
      
      const itemData: AddItemRequest = {
        categoryId: selectedCategoryId,
        subcategoryName: itemForm.subcategoryName || 'General',
        subsectionName: itemForm.subsectionName || undefined,
        item: {
          name: itemForm.name,
          description: itemForm.description,
          price: parseFloat(itemForm.price)
        }
      };
      
      await CatalogService.addItem(itemData);
      showMessage('Producto agregado exitosamente');
      closeModal();
      await loadCategories();
    } catch (err: any) {
      // Mostrar mensaje específico si la subcategoría o subsección no existe
      const errorMessage = err.message || 'Error al agregar producto';
      if (errorMessage.toLowerCase().includes('subcategor') || errorMessage.toLowerCase().includes('subsec') || errorMessage.toLowerCase().includes('no existe')) {
        const location = itemForm.subsectionName 
          ? `subcategoría "${itemForm.subcategoryName || 'General'}" y subsección "${itemForm.subsectionName}"`
          : `subcategoría "${itemForm.subcategoryName || 'General'}"`;
        showMessage(`La ${location} no existe. Verifica el nombre o contacta al administrador.`, true);
      } else {
        showMessage(errorMessage, true);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteItemHandler = async (categoryId: string, itemName: string) => {
    if (!confirm(`¿Estás seguro de eliminar el producto "${itemName}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await CatalogService.deleteItem(categoryId, itemName);
      showMessage('Producto eliminado exitosamente');
      await loadCategories();
    } catch (err: any) {
      showMessage(err.message || 'Error al eliminar producto', true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCategoryId('');
    setItemForm({ name: '', description: '', price: '', subcategoryName: '', subsectionName: '' });
  };

  const renderMessages = () => (
    <>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
          >
            <AlertTriangle className="text-red-400" size={20} />
            <span className="text-red-400">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3"
          >
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-green-400">{success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );



  const renderItemModal = () => {
    const modalContent = (
      <AnimatePresence>
        {modalType === 'item' && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Nuevo Producto
                  </h3>
                  <p className="text-gray-400 text-sm">Agrega un producto a una subcategoría o subsección</p>
                </div>
                <button 
                  onClick={closeModal} 
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    value={itemForm.name}
                    onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="Nombre del producto"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subcategoría
                  </label>
                  <input
                    type="text"
                    value={itemForm.subcategoryName}
                    onChange={(e) => setItemForm(prev => ({ ...prev, subcategoryName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="General"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subsección <span className="text-gray-500 text-xs">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={itemForm.subsectionName}
                    onChange={(e) => setItemForm(prev => ({ ...prev, subsectionName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="Deja vacío si no hay subsección"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Precio (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={itemForm.price}
                    onChange={(e) => setItemForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={itemForm.description}
                    onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none"
                    rows={3}
                    placeholder="Descripción del producto"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveItemHandler}
                    disabled={loading || !itemForm.name || !itemForm.price}
                    className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                    <span className="ml-2">Agregar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando menú...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderMessages()}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Gestión del Menú</h3>
          <p className="text-gray-400">Administra productos del menú</p>
        </div>
      </div>

      <div className="grid gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <UtensilsCrossed className="text-yellow-400" size={24} />
                <div>
                  <h4 className="text-xl font-bold text-white">{category.name}</h4>
                  <p className="text-gray-400 text-sm">/{category.slug}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openItemModal(category.id)}
                  className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                  title="Agregar producto"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>



            <div className="space-y-4">
              {category.subcategories?.map((subcategory) => (
                <div key={subcategory.name} className="border-l-2 border-yellow-400/30 pl-4">
                  <h5 className="text-lg font-semibold text-white mb-3">{subcategory.name}</h5>
                  
                  {/* Renderizar items directos de la subcategoría */}
                  {subcategory.items && subcategory.items.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                      {subcategory.items.map((item) => (
                        <div
                          key={item.name}
                          className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 group hover:border-gray-500 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h6 className="font-medium text-white truncate">{item.name}</h6>
                              {item.description && (
                                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
                              )}
                              <p className="text-yellow-400 font-bold mt-2">{item.price}€</p>
                            </div>
                            
                            <button
                              onClick={() => deleteItemHandler(category.id, item.name)}
                              className="ml-2 p-1 text-red-400 hover:bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                              title="Eliminar producto"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Renderizar subsecciones */}
                  {subcategory.subsections?.map((subsection) => (
                    <div key={subsection.name} className="border-l-2 border-blue-400/30 pl-4 mb-4">
                      <h6 className="text-md font-medium text-blue-300 mb-2">{subsection.name}</h6>
                      
                      {subsection.items && subsection.items.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {subsection.items.map((item) => (
                            <div
                              key={item.name}
                              className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 group hover:border-gray-500 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h6 className="font-medium text-white truncate">{item.name}</h6>
                                  {item.description && (
                                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
                                  )}
                                  <p className="text-yellow-400 font-bold mt-2">{item.price}€</p>
                                  <p className="text-blue-300 text-xs mt-1">en {subsection.name}</p>
                                </div>
                                
                                <button
                                  onClick={() => deleteItemHandler(category.id, item.name)}
                                  className="ml-2 p-1 text-red-400 hover:bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                                  title="Eliminar producto"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-600">
                          <p className="text-sm">Subsección vacía</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {(!category.subcategories || category.subcategories.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <UtensilsCrossed size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No hay productos en esta categoría</p>
                  <p className="text-xs mt-1">Los productos pueden estar en subcategorías o subsecciones</p>
                  <button
                    onClick={() => openItemModal(category.id)}
                    className="mt-2 text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    Agregar el primer producto
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {categories.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-500">
            <UtensilsCrossed size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No hay categorías</h3>
            <p>Las categorías deben ser creadas desde el backend</p>
          </div>
        )}
      </div>

      {/* Render modals */}
      {renderItemModal()}
    </div>
  );
};

export default MenuManagement;