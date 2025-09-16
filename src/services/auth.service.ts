import type { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';
import { apiClient } from '../utils/api-client';
import { TokenManager } from '../utils/token-manager';

class AuthService {
  // Credenciales de prueba locales (fallback)
  private mockUsers = [
    { 
      id: '1', 
      email: 'admin@example.com', 
      password: 'admin123', 
      role: 'admin' as const,
      name: 'Admin User' 
    },
    { 
      id: '2', 
      email: 'user@example.com', 
      password: 'user123', 
      role: 'user' as const,
      name: 'Regular User' 
    }
  ];

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Intentar autenticación con backend
      const response = await apiClient.post<{ access_token: string; user: User }>('/auth/login', credentials);
      
      // Adaptar la respuesta del backend al formato esperado
      const authResponse: AuthResponse = {
        token: response.access_token,
        user: response.user
      };
      
      TokenManager.setToken(authResponse.token);
      TokenManager.setUser(authResponse.user);
      return authResponse;
    } catch (error) {
      console.warn('Backend no disponible, usando autenticación local:', error);
      
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
      // Intentar registro con backend
      const response = await apiClient.post<{ access_token: string; user: User }>('/auth/register', data);
      
      // Adaptar la respuesta del backend al formato esperado
      const authResponse: AuthResponse = {
        token: response.access_token,
        user: response.user
      };
      
      TokenManager.setToken(authResponse.token);
      TokenManager.setUser(authResponse.user);
      return authResponse;
    } catch (error) {
      console.warn('Backend no disponible, usando registro local:', error);
      
      // Verificar si el email ya existe en el mock
      if (this.mockUsers.some(user => user.email === data.email)) {
        throw new Error('El email ya está registrado');
      }

      const user: User = {
        id: Date.now().toString(),
        email: data.email,
        role: 'user',
        name: data.name || 'Usuario'
      };

      const token = 'mock-token-' + Date.now();
      
      // Agregar usuario al mock para futuras referencias
      this.mockUsers.push({
        id: user.id,
        email: user.email,
        password: 'mock-password',
        role: 'user',
        name: user.name || 'Usuario'
      });
      
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
      // Intentar obtener el usuario actual del backend
      const user = await apiClient.get<User>('/auth/profile');
      TokenManager.setUser(user);
      return user;
    } catch (error) {
      console.warn('No se pudo verificar usuario con backend:', error);
      return null;
    }
  }
}

export const authService = new AuthService();