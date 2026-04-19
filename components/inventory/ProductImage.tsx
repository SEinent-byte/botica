'use client';

import { useState } from 'react';
import { getProductImage } from '@/lib/imageService';
import { Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  product: {
    name: string;
    category?: string;
    imageUrl?: string | null;
  };
  width?: number;
  height?: number;
  className?: string;
}

export default function ProductImage({ 
  product, 
  width = 80, 
  height = 80,
  className 
}: ProductImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Obtener URL de imagen
  const imageUrl = getProductImage(product, width, height);

  // Si hay error cargando o es un placeholder con texto muy largo, mostrar icono
  const showFallback = error || (!loaded && !product.imageUrl);

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center",
        "border border-slate-200/50 shadow-sm",
        className
      )}
      style={{ width, height }}
    >
      {/* Imagen real o generada */}
      <img
        src={imageUrl}
        alt={product.name}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-all duration-300",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
          "group-hover:scale-110"
        )}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
      />

      {/* Fallback mientras carga o si hay error */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100/50">
          <Package className="w-8 h-8 text-primary-400" />
        </div>
      )}

      {/* Overlay con iniciales si no hay imagen personalizada */}
      {!product.imageUrl && loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-primary-600/10">
          <span className="text-lg font-bold text-primary-700">
            {product.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
