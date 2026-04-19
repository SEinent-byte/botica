'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';
import { storage } from '@/lib/data';
import { Sale } from '@/types';
import { Download, Eye, FileText, Search } from 'lucide-react';

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    const loadedSales = storage.getSales();
    setSales(loadedSales);
    setFilteredSales(loadedSales);
  }, []);

  useEffect(() => {
    let filtered = sales;

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter((s) =>
            new Date(s.createdAt).toDateString() === today.toDateString()
          );
          break;
        case 'week':
          filterDate.setDate(filterDate.getDate() - 7);
          filtered = filtered.filter((s) => new Date(s.createdAt) >= filterDate);
          break;
        case 'month':
          filterDate.setDate(filterDate.getDate() - 30);
          filtered = filtered.filter((s) => new Date(s.createdAt) >= filterDate);
          break;
      }
    }

    setFilteredSales(filtered);
  }, [searchQuery, dateFilter, sales]);

  const exportSales = () => {
    const headers = ['ID', 'Fecha', 'Cliente', 'Items', 'Total', 'Método de Pago', 'Estado'];
    const rows = filteredSales.map((s) => [
      s.id,
      new Date(s.createdAt).toLocaleString('es-ES'),
      s.customerName || 'Cliente general',
      s.items.length,
      s.total.toFixed(2),
      s.paymentMethod === 'cash' ? 'Efectivo' : s.paymentMethod === 'card' ? 'Tarjeta' : 'Transferencia',
      s.status,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ventas.csv';
    a.click();
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      cash: 'Efectivo',
      card: 'Tarjeta',
      transfer: 'Transferencia',
    };
    return labels[method] || method;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Historial de Ventas" subtitle="Gestión y seguimiento de ventas" />
        
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por ID o cliente..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">Todas las fechas</option>
                    <option value="today">Hoy</option>
                    <option value="week">Esta semana</option>
                    <option value="month">Este mes</option>
                  </select>

                  <Button variant="outline" onClick={exportSales}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Table */}
          <Card>
            <CardHeader>
              <CardTitle>Ventas ({filteredSales.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Venta</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No se encontraron ventas
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>
                          {new Date(sale.createdAt).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell>{sale.customerName || 'Cliente general'}</TableCell>
                        <TableCell>{sale.items.length} productos</TableCell>
                        <TableCell className="font-semibold">
                          S/ {sale.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" size="sm">
                            {getPaymentMethodLabel(sale.paymentMethod)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={sale.status === 'completed' ? 'success' : 'warning'} size="sm">
                            {sale.status === 'completed' ? 'Completada' : 'Pendiente'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedSale(sale)}
                            className="p-2"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Sale Detail Modal */}
      <Modal
        isOpen={!!selectedSale}
        onClose={() => setSelectedSale(null)}
        title={`Detalle de Venta ${selectedSale?.id}`}
        size="lg"
      >
        {selectedSale && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="font-medium">
                  {new Date(selectedSale.createdAt).toLocaleString('es-ES')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cliente</p>
                <p className="font-medium">{selectedSale.customerName || 'Cliente general'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Método de Pago</p>
                <p className="font-medium">{getPaymentMethodLabel(selectedSale.paymentMethod)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <Badge variant={selectedSale.status === 'completed' ? 'success' : 'warning'}>
                  {selectedSale.status === 'completed' ? 'Completada' : 'Pendiente'}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Productos</p>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Producto</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Cantidad</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Precio</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {selectedSale.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-sm">{item.productName}</td>
                        <td className="px-4 py-2 text-sm text-right">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-right">S/ {item.price.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-right font-medium">
                          S/ {item.subtotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Subtotal:</td>
                      <td className="px-4 py-2 text-sm font-medium text-right">
                        S/ {selectedSale.total.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">IGV (18%):</td>
                      <td className="px-4 py-2 text-sm font-medium text-right">
                        S/ {(selectedSale.total * 0.18).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-base font-bold text-right">TOTAL:</td>
                      <td className="px-4 py-2 text-base font-bold text-right text-primary-600">
                        S/ {(selectedSale.total * 1.18).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setSelectedSale(null)} className="flex-1">
                Cerrar
              </Button>
              <Button variant="primary" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Imprimir Boleta
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
