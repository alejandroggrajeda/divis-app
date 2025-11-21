# Divis App

Una aplicación móvil desarrollada con Ionic React y Capacitor que incluye un conversor de divisas.

## Requisitos Previos

- Node.js (versión 16 o superior)
- pnpm (gestor de paquetes)
- Android Studio (para desarrollo Android)

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/alejandroggrajeda/divis-app
cd divis-app
```

2. Instalar las dependencias:

```bash
pnpm install
```

## Comandos Disponibles

### Desarrollo Web

Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilación

Compilar el proyecto para producción:

```bash
pnpm build
```

Vista previa de la compilación:

```bash
pnpm preview
```

### Linting

Ejecutar el linter:

```bash
pnpm lint
```

## Desarrollo Móvil

### Android

1. Sincronizar el proyecto con Capacitor:

```bash
npx cap sync android
```

2. Abrir en Android Studio:

```bash
npx cap open android
```

3. Ejecutar la aplicación desde Android Studio o usar:

```bash
npx cap run android
```

## Estructura del Proyecto

```
src/
  ├── App.tsx              # Componente principal
  ├── main.tsx             # Punto de entrada
  └── pages/
      └── CurrencyConverter # Conversor de divisas
```

## Tecnologías Utilizadas

- **Ionic React** - Framework UI para aplicaciones móviles
- **Capacitor** - Runtime nativo para aplicaciones web
- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de build y desarrollo
- **TypeScript** - Superset tipado de JavaScript

## Licencia

Proyecto privado
