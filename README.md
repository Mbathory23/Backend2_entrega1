# Entrega N°1 - Backend Ecommerce

## Instrucciones

1. Clonar el repositorio o abrir la carpeta en Visual Studio Code.
2. Ejecutar `npm install` para instalar dependencias.
3. Crear un archivo `.env` con el contenido proporcionado (MONGO_URL, JWT_SECRET, PORT).
4. Ejecutar el servidor con `npm start`.
5. Probar las rutas con Postman:

### Endpoints

- **POST** `/api/sessions/register` → Registrar usuario
- **POST** `/api/sessions/login` → Login y obtener token
- **GET** `/api/sessions/current` → Ver usuario logueado (requiere token)

