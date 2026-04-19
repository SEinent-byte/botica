'use client';

import { useState, useEffect } from 'react';
import { getProductImage } from '@/lib/imageService';
import { getDailyMedImage, getRxImage } from '@/lib/imageServiceAdvanced';
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
  const [imageUrl, setImageUrl] = useState<string>('');

  // Cargar imagen: primero icono rápido, luego APIs avanzadas (DailyMed, RxImage)
  useEffect(() => {
    // Mostrar imagen inicial rápida (icono de categoría)
    const initialUrl = getProductImage(product, width, height);
    setImageUrl(initialUrl);

    // Si no tiene imagen personalizada, intentar APIs avanzadas
    if (!product.imageUrl) {
      const loadAdvancedImage = async () => {
        try {
          // 1. Intentar DailyMed (imágenes oficiales de empaques)
          let advancedUrl = await getDailyMedImage(product.name);
          
          // 2. Si DailyMed falla, intentar RxImage (fotos de pastillas)
          if (!advancedUrl) {
            advancedUrl = await getRxImage({ name: product.name });
          }

          // Si encontramos imagen avanzada, actualizar
          if (advancedUrl && advancedUrl !== initialUrl) {
            setImageUrl(advancedUrl);
          }
        } catch {
          // Mantener imagen inicial si fallan todas las APIs
        }
      };

      loadAdvancedImage();
    }
  }, [product.name, product.category, product.imageUrl, width, height]);

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

      {/* Overlay con iniciales si no hay imagen personalizada y no es de API médica */}
      {!product.imageUrl && loaded && !imageUrl.includes('dailymed.nlm.nih.gov') && !imageUrl.includes('rximage.nlm.nih.gov') && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-primary-600/10">
          <span className="text-lg font-bold text-primary-700">
            {product.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
