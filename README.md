# Novvos Menu

Menú interactivo y dinámico para Novvos, construido con React y Vite.

## 🚀 Vistas y Rutas

El menú cuenta con rutas especiales para pruebas y visualización específica.

### 🧪 Vista de Pruebas

Permite previsualizar cambios en los productos (usando `src/data/menu-prueba.json`) y simular diferentes días de la semana para verificar que las promociones automáticas funcionen correctamente.

- **URL base:** `/prueba`
- **Simulación de días:** Agrega el parámetro `?dia=` al final de la URL.
  - **Ejemplo:** `https://tusitio.com/prueba?dia=martes`
- **Días soportados (en español):**
  - `lunes`
  - `martes` (Activa promo de $25.000 en K-Box y Rolls)
  - `miercoles` / `miércoles`
  - `jueves` (Activa promo 2x1 en Cocteles)
  - `viernes`
  - `sabado` / `sábado`
  - `domingo`

### 🍸 Vista de Barra

Muestra únicamente las categorías relacionadas con bebidas y coctelería, ideal para el código QR de la zona de barra.

- **URL:** `/barra`
- **Categorías incluidas:** Cocteles, Barra Artesanal, Bebidas y Cervezas.

---

## 🛠️ Desarrollo

Para ejecutar el proyecto localmente:

1. Instalar dependencias: `npm install`
2. Iniciar servidor de desarrollo: `npm run dev`
3. Construir para producción: `npm run build`
