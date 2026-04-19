'use client';

import { useState, useEffect } from 'react';
import { getProductImage, getProductImageAsync } from '@/lib/imageService';
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
  className,
  useUnsplash = true
}: ProductImageProps & { useUnsplash?: boolean }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  // Cargar imagen (primero icono rápido, luego Unsplash si está habilitado)
  useEffect(() => {
    // Mostrar imagen inicial rápida
    const initialUrl = getProductImage(product, width, height);
    setImageUrl(initialUrl);

    // Si está habilitado Unsplash y no tiene imagen personalizada, intentar cargar de Unsplash
    if (useUnsplash && !product.imageUrl && product.category) {
      getProductImageAsync(product).then(url => {
        if (url !== initialUrl) {
          setImageUrl(url);
        }
      }).catch(() => {
        // Mantener imagen inicial si falla
      });
    }
  }, [product.name, product.category, product.imageUrl, width, height, useUnsplash]);

  // Si hay error cargando, mostrar icono
  const showFallback = error || !imageUrl;

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

      {/* Overlay con iniciales si no hay imagen personalizada y no es de Unsplash */}
      {!product.imageUrl && loaded && !imageUrl.includes('unsplash.com') && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-primary-600/10">
          <span className="text-lg font-bold text-primary-700">
            {product.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
