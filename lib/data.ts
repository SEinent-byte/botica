import { Product, Sale, Customer, InventoryAlert, DashboardMetrics, User } from '@/types';

// Datos de ejemplo para productos
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: 'Analgésico y antipirético',
    price: 12.50,
    stock: 150,
    minStock: 20,
    category: 'Analgésicos',
    expirationDate: '2025-12-31',
    barcode: '7501234567890',
    laboratory: 'Genfar',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '2',
    name: 'Ibuprofeno 400mg',
    description: 'Antiinflamatorio no esteroideo',
    price: 18.90,
    stock: 8,
    minStock: 15,
    category: 'Antiinflamatorios',
    expirationDate: '2025-08-15',
    barcode: '7501234567891',
    laboratory: 'MK',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '3',
    name: 'Loratadina 10mg',
    description: 'Antihistamínico',
    price: 25.00,
    stock: 45,
    minStock: 10,
    category: 'Antialérgicos',
    expirationDate: '2025-06-30',
    barcode: '7501234567892',
    laboratory: 'Genfar',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '4',
    name: 'Omeprazol 20mg',
    description: 'Inhibidor de bomba de protones',
    price: 32.50,
    stock: 3,
    minStock: 10,
    category: 'Antiácidos',
    expirationDate: '2024-05-20',
    barcode: '7501234567893',
    laboratory: 'Pfizer',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '5',
    name: 'Amoxicilina 500mg',
    description: 'Antibiótico de amplio espectro',
    price: 45.00,
    stock: 25,
    minStock: 8,
    category: 'Antibióticos',
    expirationDate: '2024-07-15',
    barcode: '7501234567894',
    laboratory: 'Bayer',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '6',
    name: 'Vitamina C 500mg',
    description: 'Suplemento vitamínico',
    price: 28.90,
    stock: 80,
    minStock: 20,
    category: 'Vitaminas',
    expirationDate: '2025-10-31',
    barcode: '7501234567895',
    laboratory: 'Naturell',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '7',
    name: 'Diclofenaco 50mg',
    description: 'Antiinflamatorio y analgésico',
    price: 22.00,
    stock: 60,
    minStock: 15,
    category: 'Antiinflamatorios',
    expirationDate: '2025-09-20',
    barcode: '7501234567896',
    laboratory: 'Genfar',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '8',
    name: 'Sales de rehidratación oral',
    description: 'Solución oral para deshidratación',
    price: 8.50,
    stock: 5,
    minStock: 12,
    category: 'Hidratación',
    expirationDate: '2025-04-30',
    barcode: '7501234567897',
    laboratory: 'Wyeth',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
];

// Datos de ejemplo para clientes
export const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'María García López',
    email: 'maria.garcia@email.com',
    phone: '987654321',
    address: 'Av. Principal 123',
    dni: '45678901',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Juan Pérez Torres',
    email: 'juan.perez@email.com',
    phone: '912345678',
    address: 'Calle Secundaria 456',
    dni: '12345678',
    createdAt: '2024-02-15',
  },
  {
    id: '3',
    name: 'Ana Rodríguez Silva',
    email: 'ana.rodriguez@email.com',
    phone: '934567890',
    address: 'Jr. Comercio 789',
    dni: '87654321',
    createdAt: '2024-03-01',
  },
];

// Datos de ejemplo para ventas
export const sampleSales: Sale[] = [
  {
    id: 'V001',
    items: [
      { productId: '1', productName: 'Paracetamol 500mg', quantity: 2, price: 12.50, subtotal: 25.00 },
      { productId: '3', productName: 'Loratadina 10mg', quantity: 1, price: 25.00, subtotal: 25.00 },
    ],
    total: 50.00,
    customerName: 'María García López',
    paymentMethod: 'cash',
    status: 'completed',
    createdAt: '2024-03-20T10:30:00',
    userId: '1',
  },
  {
    id: 'V002',
    items: [
      { productId: '2', productName: 'Ibuprofeno 400mg', quantity: 1, price: 18.90, subtotal: 18.90 },
      { productId: '6', productName: 'Vitamina C 500mg', quantity: 2, price: 28.90, subtotal: 57.80 },
    ],
    total: 76.70,
    customerName: 'Juan Pérez Torres',
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-03-20T14:15:00',
    userId: '1',
  },
  {
    id: 'V003',
    items: [
      { productId: '4', productName: 'Omeprazol 20mg', quantity: 1, price: 32.50, subtotal: 32.50 },
    ],
    total: 32.50,
    paymentMethod: 'cash',
    status: 'completed',
    createdAt: '2024-03-19T09:45:00',
    userId: '1',
  },
  {
    id: 'V004',
    items: [
      { productId: '5', productName: 'Amoxicilina 500mg', quantity: 1, price: 45.00, subtotal: 45.00 },
      { productId: '7', productName: 'Diclofenaco 50mg', quantity: 1, price: 22.00, subtotal: 22.00 },
      { productId: '8', productName: 'Sales de rehidratación oral', quantity: 3, price: 8.50, subtotal: 25.50 },
    ],
    total: 92.50,
    customerName: 'Ana Rodríguez Silva',
    paymentMethod: 'transfer',
    status: 'completed',
    createdAt: '2024-03-19T16:20:00',
    userId: '1',
  },
  {
    id: 'V005',
    items: [
      { productId: '1', productName: 'Paracetamol 500mg', quantity: 1, price: 12.50, subtotal: 12.50 },
      { productId: '2', productName: 'Ibuprofeno 400mg', quantity: 1, price: 18.90, subtotal: 18.90 },
    ],
    total: 31.40,
    paymentMethod: 'cash',
    status: 'completed',
    createdAt: '2024-03-18T11:00:00',
    userId: '1',
  },
];

// Alertas de inventario
export const sampleAlerts: InventoryAlert[] = [
  {
    id: 'A1',
    productId: '2',
    productName: 'Ibuprofeno 400mg',
    type: 'low_stock',
    message: 'Stock bajo: solo quedan 8 unidades (mínimo: 15)',
    createdAt: '2024-03-20',
    resolved: false,
  },
  {
    id: 'A2',
    productId: '4',
    productName: 'Omeprazol 20mg',
    type: 'low_stock',
    message: 'Stock crítico: solo quedan 3 unidades (mínimo: 10)',
    createdAt: '2024-03-19',
    resolved: false,
  },
  {
    id: 'A3',
    productId: '4',
    productName: 'Omeprazol 20mg',
    type: 'expiring',
    message: 'Producto próximo a vencer: 2024-05-20',
    createdAt: '2024-03-15',
    resolved: false,
  },
  {
    id: 'A4',
    productId: '5',
    productName: 'Amoxicilina 500mg',
    type: 'expiring',
    message: 'Producto próximo a vencer: 2024-07-15',
    createdAt: '2024-03-10',
    resolved: false,
  },
  {
    id: 'A5',
    productId: '8',
    productName: 'Sales de rehidratación oral',
    type: 'low_stock',
    message: 'Stock bajo: solo quedan 5 unidades (mínimo: 12)',
    createdAt: '2024-03-20',
    resolved: false,
  },
];

// Usuarios
export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@novasalud.com',
    role: 'admin',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Farmacéutico 1',
    email: 'farma1@novasalud.com',
    role: 'pharmacist',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Cajero 1',
    email: 'cajero1@novasalud.com',
    role: 'cashier',
    createdAt: '2024-02-01',
  },
];

// Métricas del dashboard
export const dashboardMetrics: DashboardMetrics = {
  totalSales: 2847.50,
  totalProducts: 394,
  lowStockProducts: 3,
  expiringProducts: 12,
  todaySales: 126.70,
  weekSales: 847.30,
  monthSales: 2847.50,
  averageTicket: 47.45,
};

// Categorías de productos
export const categories = [
  'Analgésicos',
  'Antiinflamatorios',
  'Antialérgicos',
  'Antiácidos',
  'Antibióticos',
  'Vitaminas',
  'Hidratación',
  'Otros',
];

// LocalStorage helpers
export const storage = {
  getProducts: (): Product[] => {
    if (typeof window === 'undefined') return sampleProducts;
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : sampleProducts;
  },
  setProducts: (products: Product[]) => {
    localStorage.setItem('products', JSON.stringify(products));
  },
  getSales: (): Sale[] => {
    if (typeof window === 'undefined') return sampleSales;
    const stored = localStorage.getItem('sales');
    return stored ? JSON.parse(stored) : sampleSales;
  },
  setSales: (sales: Sale[]) => {
    localStorage.setItem('sales', JSON.stringify(sales));
  },
  getCustomers: (): Customer[] => {
    if (typeof window === 'undefined') return sampleCustomers;
    const stored = localStorage.getItem('customers');
    return stored ? JSON.parse(stored) : sampleCustomers;
  },
  setCustomers: (customers: Customer[]) => {
    localStorage.setItem('customers', JSON.stringify(customers));
  },
  getAlerts: (): InventoryAlert[] => {
    if (typeof window === 'undefined') return sampleAlerts;
    const stored = localStorage.getItem('alerts');
    return stored ? JSON.parse(stored) : sampleAlerts;
  },
  setAlerts: (alerts: InventoryAlert[]) => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  },
};
