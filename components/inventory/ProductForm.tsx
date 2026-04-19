'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Alert from '@/components/ui/Alert';
import { categories } from '@/lib/data';
import { CheckCircle } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function ProductForm({ product, isOpen, onClose, onSave }: ProductFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    minStock: product?.minStock || 10,
    category: product?.category || categories[0],
    expirationDate: product?.expirationDate || '',
    barcode: product?.barcode || '',
    laboratory: product?.laboratory || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Resetear estado cuando se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      setIsSaving(false);
      setShowSuccess(false);
      setFormData({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        minStock: product?.minStock || 10,
        category: product?.category || categories[0],
        expirationDate: product?.expirationDate || '',
        barcode: product?.barcode || '',
        laboratory: product?.laboratory || '',
      });
      setErrors({});
    }
  }, [isOpen, product]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }
    if (!formData.expirationDate) {
      newErrors.expirationDate = 'La fecha de vencimiento es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSaving(true);
      
      // Simular delay para mostrar estado de guardando
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onSave(formData);
      
      // Mostrar éxito brevemente antes de cerrar
      setIsSaving(false);
      setShowSuccess(true);
      
      // Cerrar después de mostrar el éxito
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 800);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Editar Producto' : 'Nuevo Producto'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre del producto"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
          />
          <Input
            label="Código de barras"
            value={formData.barcode}
            onChange={(e) => handleChange('barcode', e.target.value)}
            placeholder="7501234567890"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Laboratorio"
            value={formData.laboratory}
            onChange={(e) => handleChange('laboratory', e.target.value)}
            placeholder="Ej: Genfar, Bayer, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Precio (S/)"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
            error={errors.price}
            required
          />
          <Input
            label="Stock actual"
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
            error={errors.stock}
            required
          />
          <Input
            label="Stock mínimo"
            type="number"
            value={formData.minStock}
            onChange={(e) => handleChange('minStock', parseInt(e.target.value) || 0)}
            helperText="Alerta cuando stock baje de este valor"
            required
          />
        </div>

        <Input
          label="Fecha de vencimiento"
          type="date"
          value={formData.expirationDate}
          onChange={(e) => handleChange('expirationDate', e.target.value)}
          error={errors.expirationDate}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none resize-none"
            placeholder="Descripción del producto..."
          />
        </div>

        {/* Feedback en tiempo real */}
        {showSuccess && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <Alert variant="success" className="mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>{product ? '¡Producto actualizado!' : '¡Producto creado!'}</span>
              </div>
            </Alert>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose} 
            className="flex-1"
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            className="flex-1"
            disabled={isSaving}
            isLoading={isSaving}
          >
            {isSaving ? 'Guardando...' : product ? 'Guardar Cambios' : 'Crear Producto'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
