'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { storage } from '@/lib/data';
import { Customer } from '@/types';
import { Plus, Search, Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const loadedCustomers = storage.getCustomers();
    setCustomers(loadedCustomers);
    setFilteredCustomers(loadedCustomers);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredCustomers(
        customers.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.dni.includes(searchQuery) ||
            c.phone?.includes(searchQuery)
        )
      );
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchQuery, customers]);

  const handleSaveCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const customerData: Omit<Customer, 'id' | 'createdAt'> = {
      name: formData.get('name') as string,
      dni: formData.get('dni') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    };

    if (editingCustomer) {
      const updated = customers.map((c) =>
        c.id === editingCustomer.id
          ? { ...c, ...customerData }
          : c
      );
      setCustomers(updated);
      storage.setCustomers(updated);
    } else {
      const newCustomer: Customer = {
        ...customerData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      const updated = [...customers, newCustomer];
      setCustomers(updated);
      storage.setCustomers(updated);
    }

    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  const handleDelete = () => {
    if (deleteCustomer) {
      const updated = customers.filter((c) => c.id !== deleteCustomer.id);
      setCustomers(updated);
      storage.setCustomers(updated);
      setDeleteCustomer(null);
    }
  };

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-slate-100">
      <Sidebar />
      
      <div className="lg:ml-72">
        <Header title="Clientes" subtitle="Gestión de clientes y datos de contacto" />
        
        <main className="p-6 sm:p-8 lg:p-10">
          {/* Filters & Actions */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, DNI o teléfono..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <Button variant="primary" onClick={() => setIsFormOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Cliente
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Clientes ({filteredCustomers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No se encontraron clientes
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                              {customer.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{customer.name}</p>
                              {customer.email && (
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {customer.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.dni}</TableCell>
                        <TableCell>
                          {customer.phone ? (
                            <span className="flex items-center gap-1 text-sm">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {customer.phone}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {customer.address ? (
                            <span className="flex items-center gap-1 text-sm">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="truncate max-w-[200px]">{customer.address}</span>
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditModal(customer)}
                              className="p-2"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteCustomer(customer)}
                              className="p-2 text-danger-600 hover:text-danger-700 hover:bg-danger-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
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

      {/* Customer Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCustomer(null);
        }}
        title={editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}
        size="md"
      >
        <form onSubmit={handleSaveCustomer} className="space-y-4">
          <Input
            label="Nombre completo"
            name="name"
            defaultValue={editingCustomer?.name}
            required
          />
          <Input
            label="DNI"
            name="dni"
            defaultValue={editingCustomer?.dni}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            defaultValue={editingCustomer?.email}
          />
          <Input
            label="Teléfono"
            name="phone"
            defaultValue={editingCustomer?.phone}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <textarea
              name="address"
              defaultValue={editingCustomer?.address}
              rows={2}
              className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsFormOpen(false);
                setEditingCustomer(null);
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {editingCustomer ? 'Guardar Cambios' : 'Crear Cliente'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteCustomer}
        onClose={() => setDeleteCustomer(null)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Está seguro de que desea eliminar al cliente{' '}
            <span className="font-semibold text-gray-900">{deleteCustomer?.name}</span>?
          </p>
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteCustomer(null)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="flex-1"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
