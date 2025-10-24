// types/order.types.ts
export interface Order {
  id: string;
  name: string;
  phone: string;
  email: string;
  quantity: number;
  observations?: string;
  type: OrderType;
  price: number;
  food: string[];
  // 'pending' -> initial state, 'open' -> active, 'closed' -> finished
  status: 'pending' | 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export type OrderType = 'classic' | 'traditional' | 'premium';

export const OrderType = {
  CLASSIC: 'classic' as const,
  TRADITIONAL: 'traditional' as const,
  PREMIUM: 'premium' as const
} as const;

export interface CreateOrderDto {
  name: string;
  phone: string;
  email: string;
  quantity: number;
  observations?: string;
  type: OrderType;
  // When creating we usually start in 'pending', server can set default so optional
  status?: 'pending' | 'open' | 'closed';
}

export interface UpdateOrderDto {
  name?: string;
  phone?: string;
  email?: string;
  quantity?: number;
  observations?: string;
  type?: OrderType;
  status?: 'pending' | 'open' | 'closed';
}

export interface OrderStats {
  totalOrders: number;
  ordersByType: {
    type: string;
    count: number;
    totalRevenue: number;
  }[];
  totalRevenue: number;
}

// Configuración de tipos de pedido
export const ORDER_CONFIG = {
  [OrderType.CLASSIC]: {
    price: 4,
    food: ['Coffee', 'Orange juice', 'Croissant'],
    label: 'Clásico'
  },
  [OrderType.TRADITIONAL]: {
    price: 5,
    food: ['Coffee', 'Orange juice', 'Ham sandwich'],
    label: 'Tradicional'
  },
  [OrderType.PREMIUM]: {
    price: 6,
    food: ['Coffee', 'Orange juice', 'Avocado and salmon sandwich'],
    label: 'Premium'
  }
} as const;