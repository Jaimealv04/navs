import type { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';
import { apiClient } from '../utils/api-client';
import { TokenManager } from '../utils/token-manager';

class AuthService {
  // Credenciales de prueba locales
  private mockUsers = [
    { 
      id: '1', 
      email: 'admin@test.com', 
      password: 'admin123', 
      role: 'admin' as const,
      name: 'Administrador' 
    },
    { 
      id: '2', 
      email: 'user@test.com', 
      password: 'user123', 
      role: 'user' as const,
      name: 'Usuario' 
    }
  ];

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Intentar autenticación con backend
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      TokenManager.setToken(response.token);
      TokenManager.setUser(response.user);
      return response;
    } catch (error) {
      console.warn('Backend no disponible, usando autenticación local');
      
      // Fallback a autenticación local
      const mockUser = this.mockUsers.find(
        user => user.email === credentials.email && user.password === credentials.password
      );

      if (!mockUser) {
        throw new Error('Credenciales inválidas');
      }

      const user: User = {
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        name: mockUser.name
      };

      const token = 'mock-token-' + Date.now();
      
      TokenManager.setToken(token);
      TokenManager.setUser(user);

      return { user, token };
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      TokenManager.setToken(response.token);
      TokenManager.setUser(response.user);
      return response;
    } catch (error) {
      console.warn('Backend no disponible, usando registro local');
      
      // Verificar si el email ya existe
      if (this.mockUsers.some(user => user.email === data.email)) {
        throw new Error('El email ya está registrado');
      }

      const user: User = {
        id: Date.now().toString(),
        email: data.email,
        role: 'user',
        name: data.name
      };

      const token = 'mock-token-' + Date.now();
      
      TokenManager.setToken(token);
      TokenManager.setUser(user);

      return { user, token };
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.warn('Backend no disponible para logout');
    } finally {
      TokenManager.clear();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const savedUser = TokenManager.getUser();
    if (savedUser) {
      return savedUser;
    }

    try {
      const user = await apiClient.get<User>('/auth/me');
      TokenManager.setUser(user);
      return user;
    } catch (error) {
      console.warn('No se pudo verificar usuario con backend');
      return null;
    }
  }
}

export const authService = new AuthService();