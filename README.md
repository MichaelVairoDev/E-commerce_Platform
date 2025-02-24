# 🛍️ E-commerce Platform

## 📝 Descripción

Una plataforma de comercio electrónico moderna y completa construida con el stack MERN (MongoDB, Express.js, React, Node.js). El proyecto incluye funcionalidades como catálogo de productos, carrito de compras, sistema de autenticación, y más.

## 📸 Capturas de Pantalla

### 🏠 Página Principal

![Página Principal](/screenshots/home.png)
_Vista del catálogo principal con productos destacados y categorías_

### 🛒 Carrito de Compras

![Carrito](/screenshots/cart.png)
_Interfaz del carrito de compras con resumen de productos_

### 👤 Perfil de Usuario

![Perfil](/screenshots/profile.png)
_Panel de control del usuario con historial de órdenes_

### 💳 Proceso de Pago

![Checkout](/screenshots/checkout.png)
_Proceso de pago seguro con integración PayPal_

## 🚀 Tecnologías Utilizadas

### Frontend

- ⚛️ React.js con TypeScript
- 🎨 Material-UI para la interfaz de usuario
- 🔄 Redux para el manejo del estado
- 🌐 Axios para las peticiones HTTP
- 🛣️ React Router para la navegación

### Backend

- 📦 Node.js con Express
- 🗃️ MongoDB como base de datos
- 🔐 JWT para autenticación
- 📝 TypeScript para tipado estático
- 🔄 Mongoose para modelado de datos

### DevOps

- 🐳 Docker y Docker Compose para containerización
- 🔄 Hot-reload en desarrollo
- 🔒 Variables de entorno para configuración

## 🛠️ Requisitos Previos

- Docker y Docker Compose instalados
- Node.js (versión 14 o superior)
- npm o yarn
- Git

## ⚙️ Configuración del Proyecto

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd E-commerce_Platform
```

2. **Configurar variables de entorno**

Frontend (.env):

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

Backend (.env):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/ecommerce
JWT_SECRET=super_secret_jwt_key_for_development
```

## 🚀 Iniciar el Proyecto

### Con Docker (Recomendado)

1. **Construir y levantar los contenedores**

```bash
docker-compose up --build
```

Esto iniciará:

- Frontend en http://localhost:3000
- Backend en http://localhost:5000
- MongoDB en localhost:27017

### Sin Docker (Desarrollo local)

1. **Iniciar el Backend**

```bash
cd backend
npm install
npm run dev
```

2. **Iniciar el Frontend**

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

## 📊 Estructura de Datos

### Productos de Prueba

El proyecto incluye una base de datos pre-poblada con más de 60 productos en diferentes categorías:

- 📱 Electronics
- 📚 Books
- 👕 Clothing
- 🏠 Home
- ⚽ Sports
- 🎨 Otros (Arte, Música, Jardín, etc.)

Los datos de prueba se encuentran en:

```
backend/docker/mongo-init.js
```

## 🔍 Características Principales

- 🛍️ Catálogo de productos con búsqueda y filtros
- 🛒 Carrito de compras
- 👤 Autenticación de usuarios
- 💳 Proceso de checkout
- 📱 Diseño responsive
- 🔍 Búsqueda de productos
- ⭐ Sistema de reseñas y calificaciones

## 🗂️ Estructura del Proyecto

```
E-commerce_Platform/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   ├── docker/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## 🔐 Seguridad

- Autenticación mediante JWT
- Contraseñas encriptadas
- Variables de entorno para datos sensibles
- Validación de datos en frontend y backend

## 🧪 Testing

```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
```

## 📝 API Endpoints

### Productos

- GET /api/products - Obtener todos los productos
- GET /api/products/:id - Obtener un producto específico
- POST /api/products - Crear un nuevo producto (Admin)
- PUT /api/products/:id - Actualizar un producto (Admin)
- DELETE /api/products/:id - Eliminar un producto (Admin)

### Usuarios

- POST /api/users/register - Registro de usuario
- POST /api/users/login - Login de usuario
- GET /api/users/profile - Obtener perfil de usuario

### Órdenes

- POST /api/orders - Crear una orden
- GET /api/orders - Obtener órdenes del usuario
- GET /api/orders/:id - Obtener una orden específica

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Soporte

Para soporte o preguntas, por favor abre un issue en el repositorio.

---

⌨️ con ❤️ por [Michael Vairo]
