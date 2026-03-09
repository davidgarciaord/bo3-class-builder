# BO3 Class Builder

Aplicación web desarrollada con **React** inspirada en la interfaz de **Call of Duty: Black Ops 3**.  
Permite a los usuarios registrarse, iniciar sesión, consultar armas, mapas, especialistas y rachas, además de crear, editar y borrar clases personalizadas.

## Descripción del proyecto

El proyecto consiste en una aplicación web temática de Black Ops 3 en la que los usuarios pueden crear y gestionar sus propias clases de armas del juego.

La aplicación incluye un sistema de login con roles diferenciados:

- **Usuario normal**: puede consultar contenido del juego y gestionar sus propias clases.
- **Admin**: puede gestionar contenido global de la aplicación, como armas, mapas y clases de usuarios.

## Funcionalidades principales

### Usuario
- Registro de cuenta
- Inicio de sesión
- Visualización de armas
- Visualización de mapas
- Visualización de especialistas
- Visualización de rachas
- Crear clases personalizadas
- Editar clases
- Borrar clases
- Ver únicamente sus propias clases

### Admin
- Acceso a panel de administración
- Añadir armas
- Borrar armas
- Añadir mapas
- Borrar mapas
- Eliminar clases de cualquier usuario

## Tecnologías utilizadas

### Framework principal
- **React**

### Herramientas y librerías
- **Vite**
- **React Router DOM**
- **Bootstrap**
- **React Hook Form**
- **Zustand**
- **React Toastify**
- **JSON Server**

## Versiones
Las versiones exactas utilizadas pueden consultarse en el archivo `package.json`.

## Estructura del proyecto

El proyecto está organizado siguiendo una estructura separada por responsabilidades:

- `src/components` → componentes reutilizables
- `src/features` → lógica dividida por funcionalidades
- `src/pages` → páginas principales
- `src/data` → datos estáticos del frontend
- `src/styles` → estilos globales
- `public/images` → imágenes del proyecto
- `db.json` → base de datos simulada para JSON Server

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/davidgarciaord/bo3-class-builder.git

Proyecto académico desarrollado con React.