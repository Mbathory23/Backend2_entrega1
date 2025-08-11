/*import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import sessionRouter from './routes/sessions.router.js';
import './config/passport.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/api/sessions', sessionRouter);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));*/


//prueba

import dotenv from 'dotenv';
dotenv.config(); // 📌 Cargar variables de entorno primero

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import sessionRouter from './routes/sessions.router.js';
import './config/passport.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionRouter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
