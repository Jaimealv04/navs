// Re-exportar hooks de autenticación
export { useAuth, useIsAdmin, useUser } from '../contexts/AuthContext';

// Re-exportar hooks de catálogo
export {
  useCategories,
  useCategoryBySlug,
  useItemSearch,
  useCatalogStats,
  useAllItems,
} from './useCatalog';

// Re-exportar hooks de administración
export {
  useCategoryAdmin,
  useItemAdmin,
  useAdminOperations,
} from './useAdmin';

// Hook genérico para operaciones async
// export { useAsync, useLazyAsync } from './useAsync';