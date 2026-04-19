// APIs ESPECIALIZADAS para imágenes de medicamentos
// Más precisas que Unsplash para productos farmacéuticos

// ============================================================================
// 1. OPENFDA (FDA Estadounidense) - MÁS PRECISA
// Base de datos oficial de medicamentos aprobados por la FDA
// Incluye imágenes de etiquetas, empaques y pastillas
// ============================================================================

export async function getOpenFDAImage(drugName: string): Promise<string | null> {
  try {
    // Buscar en OpenFDA por nombre de medicamento
    const response = await fetch(
      `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(drugName)}"&limit=1`
    );

    if (!response.ok) return null;

    const data = await response.json();
    const result = data.results?.[0];
    
    if (result?.openfda?.package_ndc?.[0]) {
      // Construir URL de DailyMed usando NDC
      const ndc = result.openfda.package_ndc[0];
      return `https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=${result.set_id}&name=${encodeURIComponent(drugName)}`;
    }

    return null;
  } catch {
    return null;
  }
}

// ============================================================================
// 2. DAILYMED (NIH/NLM) - IMÁGENES OFICIALES
// Repositorio oficial de etiquetas e imágenes de medicamentos de EE.UU.
// ============================================================================

export async function getDailyMedImage(medicationName: string): Promise<string | null> {
  try {
    // Buscar medicamento en DailyMed
    const searchResponse = await fetch(
      `https://dailymed.nlm.nih.gov/api/rxname.json?name=${encodeURIComponent(medicationName)}&limit=1`
    );

    if (!searchResponse.ok) return null;

    const searchData = await searchResponse.json();
    const setId = searchData?.results?.[0]?.setid;

    if (!setId) return null;

    // Obtener imágenes del set
    const mediaResponse = await fetch(
      `https://dailymed.nlm.nih.gov/api/rximage.json?setid=${setId}&limit=1`
    );

    if (!mediaResponse.ok) return null;

    const mediaData = await mediaResponse.json();
    
    // Retornar URL de la imagen
    if (mediaData?.results?.[0]?.imageUrl) {
      return mediaData.results[0].imageUrl;
    }

    return null;
  } catch {
    return null;
  }
}

// ============================================================================
// 3. RXIMAGE (National Library of Medicine)
// API especializada específicamente en imágenes de medicamentos
// ============================================================================

interface RxImageSearch {
  name?: string;
  ndc?: string;
  rxcui?: string;
}

export async function getRxImage(params: RxImageSearch): Promise<string | null> {
  try {
    let url = 'https://rximage.nlm.nih.gov/api/rximage/1/rxbase?';
    
    if (params.ndc) {
      url += `ndc=${encodeURIComponent(params.ndc)}`;
    } else if (params.rxcui) {
      url += `rxcui=${encodeURIComponent(params.rxcui)}`;
    } else if (params.name) {
      url += `name=${encodeURIComponent(params.name)}`;
    } else {
      return null;
    }

    url += '&resolution=600'; // Alta resolución

    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    
    if (data?.nlmRxImages?.[0]?.imageUrl) {
      return data.nlmRxImages[0].imageUrl;
    }

    return null;
  } catch {
    return null;
  }
}

// ============================================================================
// 4. DRUGBANK - Base de datos completa de medicamentos
// Requiere API key (gratuita para uso educativo)
// ============================================================================

const DRUGBANK_API_KEY = process.env.NEXT_PUBLIC_DRUGBANK_KEY || '';

export async function getDrugBankImage(drugName: string): Promise<string | null> {
  if (!DRUGBANK_API_KEY) return null;

  try {
    // Buscar medicamento
    const searchResponse = await fetch(
      `https://go.drugbank.com/api/products?q=${encodeURIComponent(drugName)}&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${DRUGBANK_API_KEY}`,
        },
      }
    );

    if (!searchResponse.ok) return null;

    const data = await searchResponse.json();
    
    // DrugBank a veces tiene imágenes en los productos
    if (data?.products?.[0]?.images?.[0]?.url) {
      return data.products[0].images[0].url;
    }

    return null;
  } catch {
    return null;
  }
}

// ============================================================================
// 5. WIKIMEDIA COMMONS - Imágenes libres de medicamentos
// Buena para medicamentos genéricos y comunes
// ============================================================================

export function getWikimediaImage(medicationName: string): string {
  // Wikimedia Commons tiene muchas imágenes de medicamentos comunes
  const encodedName = encodeURIComponent(medicationName.replace(/ /g, '_'));
  
  // Intentar varias nomenclaturas comunes
  const possibleUrls = [
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedName}.jpg`,
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedName}_pills.jpg`,
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedName}_tablets.jpg`,
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedName}_package.jpg`,
  ];

  return possibleUrls[0]; // Retornar primera opción, manejar fallo en componente
}

// ============================================================================
// 6. MEDSCAPE / WEBMD - APIs de imágenes médicas
// Nota: Generalmente requieren acuerdos comerciales
// ============================================================================

// Medscape no tiene API pública abierta, pero se puede usar su CDN:
export function getMedscapeImageUrl(drugName: string): string | null {
  // Medscape usa un patrón específico para imágenes
  const normalized = drugName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `https://img.medscapestatic.com/pi/features/drugdir/${normalized}.jpg`;
}

// ============================================================================
// 7. 1mg (India) - Gran base de datos de medicamentos con imágenes
// APIs disponibles para desarrolladores
// ============================================================================

export async function get1mgImage(medicineName: string): Promise<string | null> {
  // 1mg requiere API key, pero su estructura es:
  // https://res.cloudinary.com/du8msdgbj/image/upload/{id}.jpg
  // Nota: Necesitarías scraper o API oficial
  
  // Placeholder - implementación real requiere API key de 1mg
  return null;
}

// ============================================================================
// 8. GENERACIÓN CON IA - APIs de generación de imágenes
// Útil para crear imágenes consistentes de medicamentos
// ============================================================================

// DALL-E 3 (OpenAI) - Genera imágenes realistas
export async function generateMedicineImageDALLE(
  medicineName: string, 
  openAIKey: string
): Promise<string | null> {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `Professional product photo of ${medicineName} pharmaceutical pills/tablets, white background, studio lighting, high quality medical product photography, isolated on white`,
        n: 1,
        size: '1024x1024',
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.data?.[0]?.url || null;
  } catch {
    return null;
  }
}

// Stability AI - Alternativa más económica
export async function generateMedicineImageStability(
  medicineName: string,
  stabilityKey: string
): Promise<string | null> {
  try {
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stabilityKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [{
          text: `Professional pharmaceutical product photo of ${medicineName} medicine pills, clean white background, medical photography, high detail, studio lighting`,
          weight: 1,
        }],
        cfg_scale: 7,
        samples: 1,
        steps: 30,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    // Stability retorna base64, necesitarías convertir a URL
    return data.artifacts?.[0]?.base64 
      ? `data:image/png;base64,${data.artifacts[0].base64}` 
      : null;
  } catch {
    return null;
  }
}

// ============================================================================
// 9. APIs DE MARKETPLACES LOCALES (Para Perú/Latam)
// ============================================================================

// Inkafarma / Mifarma - Podrían tener APIs o ser scaneables
// FarmaPeru - Directorio de farmacias
// MercadoLibre - Tiene API para imágenes de productos

export async function getMercadoLibreImage(productName: string): Promise<string | null> {
  try {
    // Buscar en MercadoLibre Perú
    const searchResponse = await fetch(
      `https://api.mercadolibre.com/sites/MPE/search?q=${encodeURIComponent(productName + ' farmacia')}&limit=1`
    );

    if (!searchResponse.ok) return null;

    const data = await searchResponse.json();
    const item = data.results?.[0];

    if (item?.thumbnail) {
      // MercadoLibre retorna thumbnail, reemplazar por imagen grande
      return item.thumbnail.replace('-I.jpg', '-O.jpg');
    }

    return null;
  } catch {
    return null;
  }
}

// ============================================================================
// FUNCIÓN MASTER: Intenta múltiples fuentes en orden de precisión
// ============================================================================

export async function getMedicineImageMaster(
  drugName: string,
  category?: string,
  options: {
    useOpenFDA?: boolean;
    useDailyMed?: boolean;
    useRxImage?: boolean;
    useUnsplash?: boolean;
    useMercadoLibre?: boolean;
  } = {}
): Promise<string> {
  const {
    useOpenFDA = true,
    useDailyMed = true,
    useRxImage = true,
    useUnsplash = true,
    useMercadoLibre = true,
  } = options;

  // 1. Intentar OpenFDA (más preciso para medicamentos de USA)
  if (useOpenFDA) {
    const fdaImage = await getOpenFDAImage(drugName);
    if (fdaImage) return fdaImage;
  }

  // 2. Intentar DailyMed (imágenes oficiales de empaques)
  if (useDailyMed) {
    const dailyMedImage = await getDailyMedImage(drugName);
    if (dailyMedImage) return dailyMedImage;
  }

  // 3. Intentar RxImage (especializado en imágenes de pastillas)
  if (useRxImage) {
    const rxImage = await getRxImage({ name: drugName });
    if (rxImage) return rxImage;
  }

  // 4. Intentar MercadoLibre (productos locales de Perú)
  if (useMercadoLibre) {
    const mlImage = await getMercadoLibreImage(drugName);
    if (mlImage) return mlImage;
  }

  // 5. Fallback a Unsplash (imágenes genéricas de medicamentos)
  if (useUnsplash && category) {
    const { getUnsplashImageByCategory } = await import('./imageService');
    const unsplashImage = await getUnsplashImageByCategory(category);
    if (unsplashImage) return unsplashImage;
  }

  // 6. Último fallback: UI Avatar con iniciales
  const { getUIAvatar } = await import('./imageService');
  return getUIAvatar(drugName, 200);
}
