'use client';

import { Product } from '@/types';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { label: 'Agotado', variant: 'danger' as const };
    if (stock <= minStock) return { label: 'Bajo', variant: 'warning' as const };
    return { label: 'OK', variant: 'success' as const };
  };

  const isExpiringSoon = (date: string) => {
    const expDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 60 && diffDays > 0;
  };

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Vencimiento</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-gray-500">
              No se encontraron productos
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => {
            const stockStatus = getStockStatus(product.stock, product.minStock);
            const expiringSoon = isExpiringSoon(product.expirationDate);
            const expired = isExpired(product.expirationDate);

            return (
              <TableRow key={product.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.laboratory || 'Sin laboratorio'}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" size="sm">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  S/ {product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={product.stock <= product.minStock ? 'text-danger-600 font-medium' : ''}>
                      {product.stock}
                    </span>
                    {product.stock <= product.minStock && (
                      <AlertTriangle className="w-4 h-4 text-warning-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={expired ? 'text-danger-600 font-medium' : expiringSoon ? 'text-warning-600 font-medium' : ''}>
                    {new Date(product.expirationDate).toLocaleDateString('es-ES')}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant={stockStatus.variant} size="sm">
                      Stock: {stockStatus.label}
                    </Badge>
                    {expired && (
                      <Badge variant="danger" size="sm">Vencido</Badge>
                    )}
                    {expiringSoon && !expired && (
                      <Badge variant="warning" size="sm">Por vencer</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="p-2"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product)}
                      className="p-2 text-danger-600 hover:text-danger-700 hover:bg-danger-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
