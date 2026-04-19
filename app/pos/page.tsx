'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { storage, sampleCustomers } from '@/lib/data';
import { Product, Sale, SaleItem, Customer } from '@/types';
import { Search, Plus, Minus, Trash2, ShoppingCart, CreditCard, Banknote, Smartphone, X } from 'lucide-react';

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer'>('cash');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [saleComplete, setSaleComplete] = useState(false);

  useEffect(() => {
    setProducts(storage.getProducts());
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.stock > 0 &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery))
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          price: product.price,
          subtotal: product.price,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity, subtotal: newQuantity * item.price };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const completeSale = () => {
    const newSale: Sale = {
      id: `V${Date.now().toString().slice(-6)}`,
      items: cart,
      total: cartTotal,
      customerName: selectedCustomer?.name,
      customerId: selectedCustomer?.id,
      paymentMethod,
      status: 'completed',
      createdAt: new Date().toISOString(),
      userId: '1',
    };

    // Guardar venta
    const sales = storage.getSales();
    storage.setSales([newSale, ...sales]);

    // Actualizar stock
    const updatedProducts = products.map((p) => {
      const cartItem = cart.find((item) => item.productId === p.id);
      if (cartItem) {
        return { ...p, stock: p.stock - cartItem.quantity };
      }
      return p;
    });
    setProducts(updatedProducts);
    storage.setProducts(updatedProducts);

    setCart([]);
    setSelectedCustomer(null);
    setIsCheckoutOpen(false);
    setSaleComplete(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Punto de Venta" subtitle="Realizar ventas rápidas" />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Products Section */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar producto por nombre o código de barras..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                  autoFocus
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="text-left bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-primary-300 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" size="sm">
                          {product.category}
                        </Badge>
                        <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">{product.laboratory}</p>
                      <p className="text-xl font-bold text-primary-600">
                        S/ {product.price.toFixed(2)}
                      </p>
                    </button>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron productos</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Section */}
            <div className="flex flex-col gap-4">
              <Card className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Carrito ({cart.length} items)
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>El carrito está vacío</p>
                      <p className="text-sm mt-1">Selecciona productos para comenzar</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                          <p className="text-sm text-gray-500">S/ {item.price.toFixed(2)} c/u</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-1 rounded hover:bg-gray-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="p-1 rounded hover:bg-gray-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <p className="font-semibold">S/ {item.subtotal.toFixed(2)}</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-1 text-gray-400 hover:text-danger-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-4 border-t border-gray-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-3xl font-bold text-primary-600">
                      S/ {cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={cart.length === 0}
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Proceder al Pago
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="Finalizar Venta"
        size="md"
      >
        <div className="space-y-6">
          {/* Customer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente (opcional)
            </label>
            <select
              value={selectedCustomer?.id || ''}
              onChange={(e) => {
                const customer = sampleCustomers.find((c) => c.id === e.target.value);
                setSelectedCustomer(customer || null);
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Cliente general</option>
              {sampleCustomers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.dni}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pago
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Banknote className="w-6 h-6" />
                <span className="text-sm font-medium">Efectivo</span>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-sm font-medium">Tarjeta</span>
              </button>
              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'transfer'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-sm font-medium">Transferencia</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>S/ {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IGV (18%)</span>
              <span>S/ {(cartTotal * 0.18).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
              <span className="text-lg font-semibold">Total a Pagar</span>
              <span className="text-2xl font-bold text-primary-600">
                S/ {(cartTotal * 1.18).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCheckoutOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={completeSale} className="flex-1">
              Completar Venta
            </Button>
          </div>
        </div>
      </Modal>

      {/* Sale Complete Modal */}
      <Modal
        isOpen={saleComplete}
        onClose={() => setSaleComplete(false)}
        title="¡Venta Completada!"
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-2">Venta registrada exitosamente</p>
          <p className="text-gray-500 mb-6">El stock ha sido actualizado automáticamente</p>
          <Button variant="primary" onClick={() => setSaleComplete(false)} className="w-full">
            Nueva Venta
          </Button>
        </div>
      </Modal>
    </div>
  );
}
