import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  AlertTriangle,
  CheckCircle,
  UtensilsCrossed
} from 'lucide-react';
import { CatalogService } from '../../services';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest, AddItemRequest } from '../../types';

type ModalType = 'category' | 'item' | null;

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
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  
  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: ''
  });
  
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    subcategoryName: ''
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

  // Category operations
  const openCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        name: category.name,
        slug: category.slug
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: '', slug: '' });
    }
    setModalType('category');
  };

  const saveCategoryHandler = async () => {
    try {
      setLoading(true);
      
      if (editingCategory) {
        // Update existing category
        const updateData: UpdateCategoryRequest = {
          name: categoryForm.name,
          slug: categoryForm.slug
        };
        await CatalogService.updateCategory(editingCategory.id, updateData);
        showMessage('Categoría actualizada exitosamente');
      } else {
        // Create new category
        const createData: CreateCategoryRequest = {
          name: categoryForm.name,
          slug: categoryForm.slug
        };
        await CatalogService.createCategory(createData);
        showMessage('Categoría creada exitosamente');
      }
      
      closeModal();
      await loadCategories();
    } catch (err: any) {
      showMessage(err.message || 'Error al guardar categoría', true);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategoryHandler = async (categoryId: string, categoryName: string) => {
    if (!confirm(`¿Estás seguro de eliminar la categoría "${categoryName}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await CatalogService.deleteCategory(categoryId);
      showMessage('Categoría eliminada exitosamente');
      await loadCategories();
    } catch (err: any) {
      showMessage(err.message || 'Error al eliminar categoría', true);
    } finally {
      setLoading(false);
    }
  };

  // Item operations
  const openItemModal = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setItemForm({ name: '', description: '', price: '', subcategoryName: '' });
    setModalType('item');
  };

  const saveItemHandler = async () => {
    try {
      setLoading(true);
      
      const itemData: AddItemRequest = {
        categoryId: selectedCategoryId,
        subcategoryName: itemForm.subcategoryName || 'General',
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
      showMessage(err.message || 'Error al agregar producto', true);
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
    setEditingCategory(null);
    setSelectedCategoryId('');
    setCategoryForm({ name: '', slug: '' });
    setItemForm({ name: '', description: '', price: '', subcategoryName: '' });
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

  const renderCategoryModal = () => {
    const modalContent = (
      <AnimatePresence>
        {modalType === 'category' && (
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
                <h3 className="text-xl font-bold text-white">
                  {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                </h3>
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
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="Nombre de la categoría"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="categoria-url"
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
                    onClick={saveCategoryHandler}
                    disabled={loading || !categoryForm.name || !categoryForm.slug}
                    className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    <span className="ml-2">Guardar</span>
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
                <h3 className="text-xl font-bold text-white">
                  Nuevo Producto
                </h3>
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
          <p className="text-gray-400">Administra categorías y productos</p>
        </div>
        
        <button
          onClick={() => openCategoryModal()}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
        >
          <Plus size={16} />
          <span>Nueva Categoría</span>
        </button>
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
                <button
                  onClick={() => openCategoryModal(category)}
                  className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  title="Editar categoría"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteCategoryHandler(category.id, category.name)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Eliminar categoría"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>



            <div className="space-y-4">
              {category.subcategories?.map((subcategory) => (
                <div key={subcategory.name} className="border-l-2 border-yellow-400/30 pl-4">
                  <h5 className="text-lg font-semibold text-white mb-3">{subcategory.name}</h5>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subcategory.items?.map((item) => (
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
                </div>
              ))}

              {(!category.subcategories || category.subcategories.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <UtensilsCrossed size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No hay productos en esta categoría</p>
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
            <p className="mb-4">Comienza creando tu primera categoría del menú</p>
            <button
              onClick={() => openCategoryModal()}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
            >
              <Plus size={16} />
              <span>Crear Categoría</span>
            </button>
          </div>
        )}
      </div>

      {/* Render modals */}
      {renderCategoryModal()}
      {renderItemModal()}
    </div>
  );
};

export default MenuManagement;