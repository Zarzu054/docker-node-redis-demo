# docker-node-redis-demo

Aplicación Node.js + Express que usa Redis para almacenar un contador de visitas. Todo el entorno (API + Redis) se ejecuta con Docker y Docker Compose.

## Descripción

Esta aplicación demuestra cómo integrar Node.js, Express y Redis usando Docker. La aplicación expone un endpoint GET en la raíz (`/`) que incrementa un contador de visitas almacenado en Redis y muestra el total de visitas.

## Estructura del proyecto

```
.
├── app.js                 # Aplicación Express con endpoint de contador
├── package.json           # Dependencias del proyecto (Express, Redis)
├── Dockerfile             # Imagen Docker para la aplicación Node.js
├── docker-compose.yml     # Configuración de servicios (app + redis)
└── README.md              # Este archivo
```

## Requisitos

- Docker
- Docker Compose

## Instalación y ejecución

### 1. Construir las imágenes

```bash
docker-compose build
```

### 2. Iniciar los servicios

```bash
docker-compose up
```

O en modo detached (segundo plano):

```bash
docker-compose up -d
```

### 3. Acceder a la aplicación

Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

Cada vez que visites la página, el contador se incrementará.

### 4. Detener los servicios

```bash
docker-compose down
```

## Servicios

### App (Node.js + Express)
- **Puerto**: 3000
- **Descripción**: Servidor Express que gestiona las peticiones y se conecta a Redis
- **Dependencias**: Servicio redis

### Redis
- **Imagen**: redis:alpine
- **Puerto**: 6379
- **Descripción**: Base de datos en memoria para almacenar el contador de visitas

## Tecnologías utilizadas

- **Node.js**: Runtime de JavaScript
- **Express**: Framework web minimalista
- **Redis**: Base de datos en memoria
- **Docker**: Contenerización
- **Docker Compose**: Orquestación de contenedores
