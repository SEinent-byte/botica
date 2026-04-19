'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ProductTable from '@/components/inventory/ProductTable';
import ProductForm from '@/components/inventory/ProductForm';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';
import { storage, categories } from '@/lib/data';
import { Product, InventoryAlert } from '@/types';
import { Plus, Search, Download, Filter } from 'lucide-react';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [alert, setAlert] = useState<{ message: string; variant: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const loadedProducts = storage.getProducts();
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.barcode.includes(searchQuery) ||
          p.laboratory?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();

    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, ...productData, updatedAt: now }
          : p
      );
      setProducts(updated);
      storage.setProducts(updated);
      setAlert({ message: 'Producto actualizado exitosamente', variant: 'success' });
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      const updated = [...products, newProduct];
      setProducts(updated);
      storage.setProducts(updated);
      setAlert({ message: 'Producto creado exitosamente', variant: 'success' });
    }

    setIsFormOpen(false);
    setEditingProduct(null);
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDeleteProduct = () => {
    if (deleteProduct) {
      const updated = products.filter((p) => p.id !== deleteProduct.id);
      setProducts(updated);
      storage.setProducts(updated);
      setAlert({ message: 'Producto eliminado exitosamente', variant: 'success' });
      setDeleteProduct(null);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setDeleteProduct(product);
  };

  const exportToCSV = () => {
    const headers = ['Nombre', 'Categoría', 'Precio', 'Stock', 'Stock Mínimo', 'Laboratorio', 'Vencimiento'];
    const rows = filteredProducts.map((p) => [
      p.name,
      p.category,
      p.price,
      p.stock,
      p.minStock,
      p.laboratory || '',
      p.expirationDate,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventario.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-slate-100">
      <Sidebar />
      
      <div className="lg:ml-72">
        <Header title="Inventario" subtitle="Gestión de productos y stock" />
        
        <main className="p-6 sm:p-8 lg:p-10">
          {alert && (
            <div className="mb-4">
              <Alert variant={alert.variant === 'success' ? 'success' : 'error'}>
                {alert.message}
              </Alert>
            </div>
          )}

          {/* Filters & Actions */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, código o laboratorio..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">Todas las categorías</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <Button variant="outline" onClick={exportToCSV} className="hidden sm:flex">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>

                  <Button variant="primary" onClick={() => setIsFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Producto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Productos ({filteredProducts.length} de {products.length})
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ProductTable
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Está seguro de que desea eliminar el producto{' '}
            <span className="font-semibold text-gray-900">{deleteProduct?.name}</span>?
          </p>
          <p className="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteProduct(null)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteProduct}
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
