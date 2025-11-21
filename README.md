# Divis App

Una aplicación móvil desarrollada con Ionic React y Capacitor que incluye un conversor de divisas.

## Requisitos Previos

- Node.js (versión 16 o superior)
- pnpm (gestor de paquetes)
- Android Studio (para desarrollo Android)
- Ionic CLI (opcional, instalado globalmente para conveniencia)

## Instalación

1. Instalar Ionic CLI globalmente (opcional, si no lo tienes y quieres usar comandos de Ionic directamente):

```bash
pnpm add -g @ionic/cli
```

2. Clonar el repositorio:

```bash
git clone https://github.com/alejandroggrajeda/divis-app
cd divis-app
```

3. Instalar las dependencias:

```bash
pnpm install
```

## Comandos Disponibles

### Desarrollo Web

Iniciar el servidor de desarrollo con Vite:

```bash
pnpm dev
```

O con Ionic CLI (si está instalado globalmente):

```bash
ionic serve
```

O sin instalación global:

```bash
npx @ionic/cli serve
```

La aplicación estará disponible en `http://localhost:5173` o `http://localhost:8100` (Ionic).

### Compilación

Compilar el proyecto para producción con Vite:

```bash
pnpm build
```

O con Ionic CLI (si está instalado globalmente):

```bash
ionic build
```

O sin instalación global:

```bash
npx @ionic/cli build
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

### Capacitor (Aplicación Nativa)

Sincronizar cambios con Capacitor:

```bash
npx cap sync
```

O con Ionic CLI (si está instalado globalmente):

```bash
ionic cap sync
```

O sin instalación global:

```bash
npx @ionic/cli cap sync
```

Construir y abrir en Android Studio:

```bash
npx cap sync android
npx cap open android
```

Construir y abrir en Xcode (macOS):

```bash
npx cap sync ios
npx cap open ios
```

O con Ionic CLI:

```bash
ionic cap sync ios
ionic cap open ios
```

O sin instalación global:

```bash
npx @ionic/cli cap sync ios
npx @ionic/cli cap open ios
```

## Desarrollo Móvil

### Android

1. Sincronizar el proyecto con Capacitor:

```bash
npx cap sync android
```

O con Ionic CLI (si está instalado globalmente):

```bash
ionic cap sync android
```

O sin instalación global:

```bash
npx @ionic/cli cap sync android
```

2. Abrir en Android Studio:

```bash
npx cap open android
```

O con Ionic CLI:

```bash
ionic cap open android
```

O sin instalación global:

```bash
npx @ionic/cli cap open android
```

3. Ejecutar la aplicación desde Android Studio o usar:

```bash
npx cap run android
```

O con Ionic CLI:

```bash
ionic cap run android
```

O sin instalación global:

```bash
npx @ionic/cli cap run android
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
