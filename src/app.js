import express from 'express';
import mongoose from 'mongoose';
import passport from './config/passport.js';
import sessionsRouter from './routes/sessions.router.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter);

// Conexión Mongo
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar a MongoDB", err));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${process.env.PORT}`);
});
