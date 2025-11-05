# Visela Buyer Persona & Portfolio - Proyecto React

Sistema de gestión de portafolio profesional y buyer persona para Jamileth Guerra Aguilar, estratega publicitaria con enfoque en AI Hybrid.

## Información del Proyecto

- **Tipo**: React + TypeScript Modern Web Application
- **Framework**: React 18.3.1 con Vite 7.0.0
- **Estilo**: Tailwind CSS 3.4.17 con paleta institucional Visela
- **Routing**: React Router DOM 6.30.1
- **Animaciones**: Framer Motion 11.0.8

## Paleta de Colores Institucional Visela

```css
--primary-500: #0087FC    /* Azul principal */
--accent1-500: #C12D2D    /* Rojo acento */
--accent2-500: #F5D547    /* Amarillo acento */
--neutral-900: #222626    /* Negro texto */
```

## Estructura del Proyecto

### Páginas Principales

1. **HomePage (`/`)**: Buyer Persona de Jamileth Guerra Aguilar
   - Perfil personal (cédula, edad, ubicación, contacto)
   - Análisis DISC con barras animadas
   - Competencias CFI (Calificador de Factores de Interés)
   - Frase personal inspiracional

2. **PortfolioPage (`/portfolio`)**: Gestión de proyectos
   - Filtro por categorías (Estrategia, Diseño, Website, Varios)
   - Tarjetas de proyectos con hover animado
   - Modal emergente con detalles completos
   - Soporte para imágenes y enlaces externos

3. **AdminPanelPage (`/admin`)**: Panel administrativo
   - Autenticación con contraseña cifrada SHA-256 (contraseña: `160004`)
   - CRUD completo de proyectos
   - Gestión de imágenes y enlaces externos
   - Exportación/Importación de datos JSON
   - Persistencia en localStorage

### Sistema de Datos

**Almacenamiento**: localStorage con clave `visela-portfolio-projects`

**Estructura de Proyecto**:
```typescript
{
  id: string
  slug: string
  title: string
  category: "Estrategia" | "Diseño" | "Website" | "Varios"
  projectType: "Real" | "Ficticio" | "Estudio de Caso"
  date: string (ISO format)
  mainImage: string (URL)
  summary: string
  content: {} // Estructura específica por categoría
  attachments: Array<{id, label, type, url}>
  externalLinks: Array<{label, url}>
}
```

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Compilar para producción
npm run build

# El build genera archivos en dist/
```

## Características Clave

### Autenticación
- Contraseña cifrada con SHA-256 en frontend
- Hash almacenado: `c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646`
- Contraseña original: `160004`

### Gestión de Proyectos
- Crear, editar y eliminar proyectos
- Subir múltiples imágenes (URLs separadas por coma)
- Agregar enlaces externos (URLs separadas por coma)
- Los datos persisten en localStorage hasta eliminación manual
- Exportar/Importar respaldos en formato JSON

### Modal de Proyecto
- Se abre al hacer clic en cualquier tarjeta
- Botón X en la esquina superior derecha para cerrar
- Muestra contenido completo según categoría
- Galería de imágenes y enlaces cuando están disponibles

### Animaciones
- Barras DISC con animación progresiva
- Hover effects en tarjetas de proyectos
- Transiciones suaves en modales y navegación
- Framer Motion para efectos de entrada

## Fuentes Tipográficas

- **Inter**: Texto general (font-weight 333 por defecto)
- **Playfair Display**: Frases citables (font-quote class)

## Navegación

- Navbar sticky con scroll effect
- Enlaces: Inicio, Portafolio, Panel (con color accent1)
- Responsive design para móviles

## Notas Importantes

### ⚠️ CRÍTICO: No Modificar Entry Point

**NUNCA** modificar esta línea en `index.html`:
```html
<script type="module" src="/src/main.tsx"></script>
```

### Persistencia de Datos

Todos los cambios en proyectos se guardan automáticamente en localStorage:
- Crear proyecto → Guardar en localStorage
- Editar proyecto → Actualizar en localStorage
- Eliminar proyecto → Remover de localStorage
- Los datos persisten entre sesiones del navegador

### Exportación de Respaldo

El botón "Exportar" en el panel administrativo genera un archivo JSON con:
```json
{
  "projects": [...],
  "exportDate": "2025-11-05T19:30:00.000Z"
}
```

### Importación de Datos

El botón "Importar" acepta archivos JSON con la estructura de exportación y reemplaza todos los proyectos actuales.

## Tecnologías Adicionales

- **Headless UI**: Componentes accesibles (Listbox para filtros)
- **Lucide React**: Iconos (Lock, Save, Download, Upload, Plus, Edit2, Trash2, X)
- **Framer Motion**: Animaciones y transiciones fluidas
- **React Helmet Async**: Metadatos SEO por página
- **clsx**: Utilidad para clases condicionales

## Próximas Mejoras Recomendadas

1. Migrar autenticación a backend real con `/skills/backend-integration/`
2. Implementar almacenamiento de imágenes en Cloudflare R2
3. Añadir edición de contenido específico por categoría (fases, brief, etc.)
4. Implementar búsqueda de proyectos
5. Añadir ordenamiento por fecha/categoría/tipo
