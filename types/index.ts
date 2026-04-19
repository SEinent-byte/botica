export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  category: string;
  expirationDate: string;
  barcode: string;
  laboratory?: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  customerName?: string;
  customerId?: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
  status: 'completed' | 'pending' | 'cancelled';
  createdAt: string;
  userId: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  dni: string;
  createdAt: string;
}

export interface InventoryAlert {
  id: string;
  productId: string;
  productName: string;
  type: 'low_stock' | 'expiring' | 'expired';
  message: string;
  createdAt: string;
  resolved: boolean;
}

export interface DashboardMetrics {
  totalSales: number;
  totalProducts: number;
  lowStockProducts: number;
  expiringProducts: number;
  todaySales: number;
  weekSales: number;
  monthSales: number;
  averageTicket: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier' | 'pharmacist';
  createdAt: string;
}
