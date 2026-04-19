'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import SalesChart from '@/components/dashboard/SalesChart';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import { storage } from '@/lib/data';
import { DashboardMetrics, Sale, InventoryAlert } from '@/types';
import {
  DollarSign,
  Package,
  AlertTriangle,
  Calendar,
  TrendingUp,
  ShoppingCart,
  Users,
} from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalSales: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    expiringProducts: 0,
    todaySales: 0,
    weekSales: 0,
    monthSales: 0,
    averageTicket: 0,
  });
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);

  useEffect(() => {
    // Cargar datos del almacenamiento local
    const products = storage.getProducts();
    const sales = storage.getSales();
    const allAlerts = storage.getAlerts();

    // Calcular métricas
    const lowStock = products.filter((p) => p.stock <= p.minStock).length;
    const today = new Date().toISOString().split('T')[0];
    const todaySalesTotal = sales
      .filter((s) => s.createdAt.startsWith(today))
      .reduce((sum, s) => sum + s.total, 0);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekSalesTotal = sales
      .filter((s) => new Date(s.createdAt) >= weekAgo)
      .reduce((sum, s) => sum + s.total, 0);

    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthSalesTotal = sales
      .filter((s) => new Date(s.createdAt) >= monthAgo)
      .reduce((sum, s) => sum + s.total, 0);

    const avgTicket = sales.length > 0 ? monthSalesTotal / sales.length : 0;

    setMetrics({
      totalSales: monthSalesTotal,
      totalProducts: products.length,
      lowStockProducts: lowStock,
      expiringProducts: 12,
      todaySales: todaySalesTotal,
      weekSales: weekSalesTotal,
      monthSales: monthSalesTotal,
      averageTicket: avgTicket,
    });

    setRecentSales(sales.slice(0, 5));
    setAlerts(allAlerts.filter((a) => !a.resolved).slice(0, 5));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Dashboard" subtitle="Vista general del sistema" />
        
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Ventas del Día"
              value={`S/ ${metrics.todaySales.toFixed(2)}`}
              change="+12%"
              changeType="positive"
              icon={DollarSign}
              iconBg="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              title="Total Productos"
              value={metrics.totalProducts}
              icon={Package}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Stock Bajo"
              value={metrics.lowStockProducts}
              change="Requiere atención"
              changeType={metrics.lowStockProducts > 0 ? 'negative' : 'positive'}
              icon={AlertTriangle}
              iconBg="bg-warning-100"
              iconColor="text-warning-600"
            />
            <StatCard
              title="Ticket Promedio"
              value={`S/ ${metrics.averageTicket.toFixed(2)}`}
              icon={ShoppingCart}
              iconBg="bg-primary-100"
              iconColor="text-primary-600"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Ventas de la Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <SalesChart type="bar" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tendencia Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <SalesChart type="line" />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Venta</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>{sale.customerName || 'Cliente general'}</TableCell>
                        <TableCell className="font-medium">
                          S/ {sale.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={sale.status === 'completed' ? 'success' : 'warning'} size="sm">
                            {sale.status === 'completed' ? 'Completada' : 'Pendiente'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Alertas de Inventario</CardTitle>
              </CardHeader>
              <CardContent>
                {alerts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <p>No hay alertas pendientes</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
                      >
                        <div className={`p-2 rounded-lg ${
                          alert.type === 'low_stock' ? 'bg-warning-100' : 'bg-danger-100'
                        }`}>
                          <AlertTriangle className={`w-4 h-4 ${
                            alert.type === 'low_stock' ? 'text-warning-600' : 'text-danger-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{alert.productName}</p>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                        </div>
                        <Badge
                          variant={alert.type === 'low_stock' ? 'warning' : 'danger'}
                          size="sm"
                        >
                          {alert.type === 'low_stock' ? 'Stock' : 'Vencimiento'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
