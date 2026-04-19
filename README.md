# Nova Salud - Sistema de Gestión de Botica

Aplicación web moderna para la gestión de inventario, ventas y clientes de una botica/farmacia. Desarrollada con Next.js, TypeScript y Tailwind CSS.

![Nova Salud Dashboard](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan?style=flat-square&logo=tailwind-css)

## Características Principales

- **Dashboard**: Métricas en tiempo real, gráficos de ventas y alertas
- **Gestión de Inventario**: Control de stock, alertas de vencimiento, categorización
- **Punto de Venta (POS)**: Interface rápida para realizar ventas
- **Historial de Ventas**: Seguimiento completo de transacciones
- **Gestión de Clientes**: Base de datos de clientes con historial
- **Alertas Inteligentes**: Notificaciones de stock bajo y productos por vencer
- **Exportación de Datos**: Exportar a CSV
- **Diseño Responsive**: Funciona en desktop, tablet y móvil

## Capturas de Pantalla

### Dashboard
- Estadísticas de ventas del día, semana y mes
- Gráficos de tendencias
- Alertas de inventario
- Ventas recientes

### Inventario
- Listado completo de productos
- Búsqueda por nombre, código o laboratorio
- Filtros por categoría
- Indicadores de stock y vencimiento
- Exportación a CSV

### Punto de Venta
- Búsqueda rápida de productos
- Carrito de compras
- Múltiples métodos de pago
- Impresión de boletas

## Tecnologías Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript 5
- **Estilos**: Tailwind CSS 3
- **UI Components**: Componentes personalizados
- **Iconos**: Lucide React
- **Gráficos**: Recharts
- **Estado**: React Hooks + LocalStorage

## Instalación Local

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd botica-nova-salud

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir en el navegador
http://localhost:3000
```

## Despliegue en Vercel

### Opción 1: Despliegue Automático (Recomendado)

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub/GitLab/Bitbucket
3. Selecciona el proyecto
4. ¡Listo! Vercel se encargará del resto

### Opción 2: Despliegue Manual con CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Opción 3: Exportar Estático

```bash
# Generar build estático
npm run build

# Los archivos estarán en la carpeta 'dist'
# Puedes subirlos a cualquier hosting estático
```

## Estructura del Proyecto

```
botica-nova-salud/
├── app/                    # Páginas de Next.js (App Router)
│   ├── page.tsx           # Dashboard
│   ├── inventory/         # Gestión de inventario
│   ├── pos/               # Punto de venta
│   ├── sales/             # Historial de ventas
│   ├── customers/         # Gestión de clientes
│   ├── alerts/            # Alertas de inventario
│   └── settings/          # Configuración
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   ├── layout/           # Sidebar, Header
│   ├── dashboard/        # StatCard, SalesChart
│   └── inventory/        # ProductTable, ProductForm
├── lib/                  # Utilidades y datos
│   ├── utils.ts         # Funciones helpers
│   └── data.ts          # Datos de ejemplo y storage
├── types/                # Definiciones de TypeScript
├── public/              # Archivos estáticos
└── package.json
```

## Datos de Prueba

La aplicación incluye datos de ejemplo para demostración:

- **Productos**: 8 productos de diferentes categorías (medicamentos, vitaminas, etc.)
- **Clientes**: 3 clientes registrados
- **Ventas**: 5 ventas de ejemplo

Los datos se almacenan en `localStorage` y persisten entre sesiones.

## Funcionalidades por Módulo

### Dashboard
- Ventas del día, semana y mes
- Total de productos en inventario
- Productos con stock bajo
- Ticket promedio
- Gráficos de ventas semanales y tendencia mensual

### Inventario
- CRUD completo de productos
- Campos: nombre, categoría, precio, stock, stock mínimo, laboratorio, fecha de vencimiento, código de barras
- Alertas visuales de stock bajo y vencimiento
- Filtros por categoría y búsqueda
- Exportación a CSV

### Punto de Venta
- Búsqueda rápida de productos
- Carrito de compras con modificación de cantidades
- Selección de cliente
- Múltiples métodos de pago (efectivo, tarjeta, transferencia)
- Cálculo automático de IGV
- Actualización automática de stock

### Clientes
- Registro de clientes (nombre, DNI, email, teléfono, dirección)
- Historial de compras por cliente
- Búsqueda y filtros

### Alertas
- Stock bajo (inferior al mínimo configurado)
- Productos próximos a vencer (60 días de anticipación)
- Productos vencidos
- Marcado de alertas como resueltas

## Personalización

### Cambiar colores del tema
Edita `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: "#ecfdf5",
    100: "#d1fae5",
    // ... más tonos
    600: "#059669", // Color principal
  },
}
```

### Cambiar nombre de la botica
Edita el componente `Sidebar.tsx` y `app/settings/page.tsx`.

### Configurar alertas de vencimiento
En `app/alerts/page.tsx`, modifica la variable `daysUntilExpiry`.

## Respuestas a las Preguntas del Proyecto

### 1) ¿Cuáles son los principales desafíos operativos que enfrenta la botica "Nova Salud" debido a la falta de un sistema de gestión de inventarios automatizado?

**Respuesta:**

Los principales desafíos operativos son:

- **Errores en el control de stock**: El registro manual conlleva a discrepancias entre el stock físico y el registrado, generando ventas de productos agotados o pérdida de oportunidades por stock no registrado.

- **Desabastecimientos frecuentes**: Sin alertas automáticas de stock mínimo, la botica no reabastece a tiempo, resultando en falta de productos esenciales para los clientes.

- **Tiempos de espera elevados**: La búsqueda manual de productos y cálculo de precios ralentiza la atención al cliente, generando insatisfacción.

- **Pérdida de productos por vencimiento**: Sin control de fechas de vencimiento, productos caducan sin ser detectados, representando pérdida económica y riesgo para la salud.

- **Falta de visibilidad de métricas**: No se tienen datos confiables sobre ventas, productos más vendidos, o tendencias de consumo para la toma de decisiones.

### 2) ¿Qué características específicas debe incluir el software web para atender las necesidades de control de stock y atención al cliente en "Nova Salud"?

**Respuesta:**

El software debe incluir:

**Para Control de Stock:**
- Registro completo de productos (nombre, descripción, categoría, laboratorio, código de barras)
- Control de stock en tiempo real con niveles mínimos configurables
- Alertas automáticas de stock bajo (visuales y notificaciones)
- Control de fechas de vencimiento con alertas de productos por vencer
- Historial de movimientos de inventario (entradas y salidas)
- Exportación de inventario a CSV

**Para Atención al Cliente:**
- Punto de venta rápido con búsqueda por nombre o código de barras
- Carrito de compras con cálculo automático de totales e IGV
- Base de datos de clientes con historial de compras
- Múltiples métodos de pago (efectivo, tarjeta, transferencia)
- Generación de comprobantes/boletas
- Interface responsive para atención en tablet o móvil

**Generales:**
- Dashboard con métricas clave en tiempo real
- Gestión de usuarios con diferentes roles (admin, cajero, farmacéutico)
- Sistema de respaldo de datos
- Interface intuitiva que requiera mínima capacitación

### 3) ¿De qué manera la implementación de un software web para la gestión de inventarios puede impactar en la reducción del desabastecimiento y la mejora del servicio al cliente?

**Respuesta:**

**Reducción del Desabastecimiento:**

1. **Alertas predictivas**: El sistema notifica automáticamente cuando un producto alcanza su nivel mínimo de stock, permitiendo reabastecimiento proactivo antes de que se agote.

2. **Visibilidad en tiempo real**: El administrador puede ver en cualquier momento qué productos están por agotarse y tomar decisiones de compra informadas.

3. **Análisis de tendencias**: Los reportes de ventas permiten identificar patrones estacionales y ajustar los niveles de stock anticipadamente (ej: más antigripales en invierno).

4. **Control de múltiples ubicaciones**: Si la botica tiene almacén y tienda, el sistema coordina el stock entre ambos.

**Mejora del Servicio al Cliente:**

1. **Atención más rápida**: El cajero encuentra productos en segundos mediante búsqueda por nombre o escaneo de código de barras, reduciendo el tiempo de espera de minutos a segundos.

2. **Información precisa**: Se eliminan errores en precios y cálculos, aumentando la confianza del cliente.

3. **Fidelización**: El registro de clientes permite ofrecer promociones personalizadas y recordar sus medicamentos habituales.

4. **Disponibilidad garantizada**: Con menos desabastecimientos, el cliente encuentra siempre lo que necesita.

5. **Atención 24/7 online**: Los clientes pueden consultar disponibilidad de productos antes de visitar la tienda.

### 4) ¿Qué beneficios adicionales, aparte del control de inventarios, podría ofrecer el software para incrementar la competitividad de "Nova Salud" en su mercado?

**Respuesta:**

**Beneficios Estratégicos:**

1. **Analytics y Business Intelligence**:
   - Identificación de productos estrella y de bajo movimiento
   - Análisis de horarios pico para optimizar staffing
   - Predicción de demanda basada en histórico

2. **Marketing Digital**:
   - Envío de promociones personalizadas por email/SMS a clientes registrados
   - Programa de puntos o descuentos por fidelización
   - Recordatorios automáticos para renovación de recetas

3. **E-commerce Integrado**:
   - Catálogo online con reserva de productos
   - Delivery o retiro en tienda
   - Expansión del mercado más allá de la ubicación física

4. **Gestión Financiera**:
   - Control de ingresos y egresos
   - Reportes de rentabilidad por producto/categoría
   - Integración con sistemas contables

5. **Cumplimiento Normativo**:
   - Registro automático de ventas de medicamentos controlados
   - Trazabilidad de lotes para recall de productos
   - Reportes para auditorías de salud

6. **Integración con Proveedores**:
   - Pedidos automáticos cuando se alcanza stock mínimo
   - Comparación de precios entre proveedores
   - Recepción electrónica de facturas

7. **App Móvil para Clientes**:
   - Consulta de puntos acumulados
   - Recordatorios de toma de medicamentos
   - Ubicación de sucursales

### 5) ¿Qué métricas se pueden utilizar para evaluar la efectividad del software en mejorar los tiempos de respuesta al cliente y reducir los errores en la gestión de inventario?

**Respuesta:**

**Métricas de Tiempos de Respuesta:**

| Métrica | Descripción | Meta Sugerida |
|---------|-------------|---------------|
| **Tiempo promedio de atención** | Minutos por cliente desde llegada hasta salida | < 5 minutos |
| **Tiempo de búsqueda de producto** | Segundos para localizar un producto en el sistema | < 10 segundos |
| **Tiempo de procesamiento de venta** | Desde primer producto escaneado hasta impresión de boleta | < 2 minutos |
| **Tiempo de respuesta a consultas** | Clientes atendidos por hora | > 15 clientes/hora |
| **Tasa de clientes sin espera** | % de clientes atendidos sin formar cola | > 80% |

**Métricas de Precisión de Inventario:**

| Métrica | Descripción | Meta Sugerida |
|---------|-------------|---------------|
| **Precisión de stock** | % de coincidencia entre stock físico y sistema | > 98% |
| **Tasa de ventas de productos agotados** | Ventas intentadas sin stock disponible | < 1% |
| **Productos vencidos no detectados** | Productos caducados encontrados en anaquel | 0 |
| **Error en precios cobrados** | % de ventas con corrección de precio | < 0.5% |
| **Tiempo de reconciliación de inventario** | Horas dedicadas a cuadrar inventario mensual | < 2 horas |

**Métricas de Impacto en Negocio:**

| Métrica | Descripción |
|---------|-------------|
| **Rotación de inventario** | Veces que el inventario completo se vende por año |
| **Tasa de desabastecimiento** | % de pedidos no cumplidos por falta de stock |
| **Ticket promedio** | Monto promedio por venta |
| **Clientes recurrentes** | % de clientes que vuelven a comprar |
| **Productos por transacción** | Cantidad promedio de ítems por venta |

**Método de Medición:**

1. **Línea base**: Medir métricas actuales (antes de implementar)
2. **Meta SMART**: Definir objetivos específicos por métrica
3. **Monitoreo continuo**: Dashboard en tiempo real con indicadores
4. **Revisión semanal**: Análisis de tendencias y ajustes
5. **Encuestas**: Satisfacción del cliente (NPS)

## Licencia

MIT License - Libre para uso comercial y personal.

## Soporte

Para reportar bugs o solicitar funciones, crear un issue en el repositorio.

---

**Desarrollado con por el equipo de Nova Salud** 💊
