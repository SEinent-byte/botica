'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Alert from '@/components/ui/Alert';
import { storage } from '@/lib/data';
import { Product, InventoryAlert } from '@/types';
import { AlertTriangle, Package, Calendar, CheckCircle, X } from 'lucide-react';

export default function AlertsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'low_stock' | 'expiring' | 'expired'>('all');

  useEffect(() => {
    const loadedProducts = storage.getProducts();
    setProducts(loadedProducts);
    
    // Generate alerts based on current product state
    const generatedAlerts: InventoryAlert[] = [];
    
    loadedProducts.forEach((product) => {
      // Low stock alerts
      if (product.stock <= product.minStock) {
        generatedAlerts.push({
          id: `low-${product.id}`,
          productId: product.id,
          productName: product.name,
          type: 'low_stock',
          message: `Stock bajo: ${product.stock} unidades (mínimo: ${product.minStock})`,
          createdAt: new Date().toISOString(),
          resolved: false,
        });
      }
      
      // Expiration alerts
      const expDate = new Date(product.expirationDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry < 0) {
        generatedAlerts.push({
          id: `expired-${product.id}`,
          productId: product.id,
          productName: product.name,
          type: 'expired',
          message: `Producto vencido el ${expDate.toLocaleDateString('es-ES')}`,
          createdAt: new Date().toISOString(),
          resolved: false,
        });
      } else if (daysUntilExpiry <= 60) {
        generatedAlerts.push({
          id: `expiring-${product.id}`,
          productId: product.id,
          productName: product.name,
          type: 'expiring',
          message: `Vence en ${daysUntilExpiry} días (${expDate.toLocaleDateString('es-ES')})`,
          createdAt: new Date().toISOString(),
          resolved: false,
        });
      }
    });
    
    setAlerts(generatedAlerts);
  }, []);

  const resolveAlert = (alertId: string) => {
    setResolvedAlerts((prev) => [...prev, alertId]);
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (resolvedAlerts.includes(alert.id)) return false;
    if (filter === 'all') return true;
    return alert.type === filter;
  });

  const alertCounts = {
    all: alerts.filter((a) => !resolvedAlerts.includes(a.id)).length,
    low_stock: alerts.filter((a) => a.type === 'low_stock' && !resolvedAlerts.includes(a.id)).length,
    expiring: alerts.filter((a) => a.type === 'expiring' && !resolvedAlerts.includes(a.id)).length,
    expired: alerts.filter((a) => a.type === 'expired' && !resolvedAlerts.includes(a.id)).length,
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <Package className="w-5 h-5" />;
      case 'expiring':
        return <Calendar className="w-5 h-5" />;
      case 'expired':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'low_stock':
        return 'bg-warning-50 border-warning-200 text-warning-800';
      case 'expiring':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'expired':
        return 'bg-danger-50 border-danger-200 text-danger-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Alertas de Inventario" subtitle="Monitoreo de stock y vencimientos" />
        
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                filter === 'all' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white'
              }`}
            >
              <p className="text-sm text-gray-600">Todas las alertas</p>
              <p className="text-2xl font-bold">{alertCounts.all}</p>
            </button>
            <button
              onClick={() => setFilter('low_stock')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                filter === 'low_stock' ? 'border-warning-500 bg-warning-50' : 'border-gray-200 bg-white'
              }`}
            >
              <p className="text-sm text-gray-600">Stock bajo</p>
              <p className="text-2xl font-bold text-warning-600">{alertCounts.low_stock}</p>
            </button>
            <button
              onClick={() => setFilter('expiring')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                filter === 'expiring' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <p className="text-sm text-gray-600">Próximos a vencer</p>
              <p className="text-2xl font-bold text-blue-600">{alertCounts.expiring}</p>
            </button>
            <button
              onClick={() => setFilter('expired')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                filter === 'expired' ? 'border-danger-500 bg-danger-50' : 'border-gray-200 bg-white'
              }`}
            >
              <p className="text-sm text-gray-600">Vencidos</p>
              <p className="text-2xl font-bold text-danger-600">{alertCounts.expired}</p>
            </button>
          </div>

          {/* Alerts List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {filter === 'all' && 'Todas las Alertas'}
                  {filter === 'low_stock' && 'Alertas de Stock Bajo'}
                  {filter === 'expiring' && 'Productos Próximos a Vencer'}
                  {filter === 'expired' && 'Productos Vencidos'}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({filteredAlerts.length})
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900">¡Todo en orden!</p>
                  <p className="text-gray-500">No hay alertas pendientes en esta categoría</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                    >
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{alert.productName}</p>
                          <Badge
                            variant={
                              alert.type === 'low_stock'
                                ? 'warning'
                                : alert.type === 'expired'
                                ? 'danger'
                                : 'info'
                            }
                            size="sm"
                          >
                            {alert.type === 'low_stock'
                              ? 'Stock Bajo'
                              : alert.type === 'expired'
                              ? 'Vencido'
                              : 'Por Vencer'}
                          </Badge>
                        </div>
                        <p className="text-sm opacity-90">{alert.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          Detectado: {new Date(alert.createdAt).toLocaleDateString('es-ES')}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                        className="flex-shrink-0"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolver
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Alert */}
          <div className="mt-6">
            <Alert variant="info" title="¿Cómo funcionan las alertas?">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Stock bajo:</strong> Se genera cuando el stock actual es igual o menor al stock mínimo configurado</li>
                <li><strong>Por vencer:</strong> Se genera cuando un producto vence en los próximos 60 días</li>
                <li><strong>Vencido:</strong> Se genera cuando la fecha de vencimiento ya pasó</li>
              </ul>
            </Alert>
          </div>
        </main>
      </div>
    </div>
  );
}
