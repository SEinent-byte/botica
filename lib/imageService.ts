// Servicio para obtener imágenes de productos

// Opción 1: Placeholder.com - Genera imágenes con texto
export function getPlaceholderImage(text: string, width = 200, height = 200): string {
  const encodedText = encodeURIComponent(text);
  return `https://via.placeholder.com/${width}x${height}/10b981/ffffff?text=${encodedText}`;
}

// Opción 2: UI Avatars - Genera avatares con iniciales
export function getUIAvatar(name: string, size = 200): string {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=10b981&color=fff&size=${size}&bold=true`;
}

// Opción 3: DiceBear - Genera iconos SVG de medicamentos
export function getDiceBearIcon(seed: string, style: 'identicon' | 'bottts' | 'avataaars' = 'identicon'): string {
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=10b981`;
}

// Opción 4: Unsplash - Imágenes reales de medicamentos (requiere API key para producción)
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_KEY || '';

export async function getUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    // Fallback a placeholder si no hay API key
    return getPlaceholderImage(query);
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    }
    return null;
  } catch {
    return getPlaceholderImage(query);
  }
}

// Opción 5: Imagen por categoría usando categorías predefinidas
const categoryImages: Record<string, string> = {
  medicamentos: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png',
  vitaminas: 'https://cdn-icons-png.flaticon.com/512/3082/3082060.png',
  suplementos: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png',
  cuidado_personal: 'https://cdn-icons-png.flaticon.com/512/2942/2942026.png',
  prescripcion: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png',
  default: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png',
};

export function getCategoryImage(category: string): string {
  return categoryImages[category.toLowerCase()] || categoryImages.default;
}

// Opción RECOMENDADA: Combinación inteligente
export function getProductImage(product: {
  name: string;
  category?: string;
  imageUrl?: string | null;
}, width = 200, height = 200): string {
  // Si ya tiene imagen, usarla
  if (product.imageUrl) return product.imageUrl;

  // Si tiene categoría, usar icono de categoría
  if (product.category && categoryImages[product.category.toLowerCase()]) {
    return categoryImages[product.category.toLowerCase()];
  }

  // Fallback: Generar avatar con iniciales del producto
  return getUIAvatar(product.name, Math.max(width, height));
}
