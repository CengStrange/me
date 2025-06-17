const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { poolPromise } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');
const kullaniciRoutes = require('./routes/kullaniciRoutes');
const { swaggerUi, specs } = require('./swagger');
const hedefler=require('./routes/hedefler');

const app = express();

// CORS ayarları
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Route'lar
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/kullanici', kullaniciRoutes);
app.use('/api/hedefler', hedefler);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Test endpoint
app.get('/test-db', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT GETDATE() AS Zaman');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Bağlantı hatası');
  }
});

// 🟩 HTTP server 0.0.0.0 ile dış ağlara açık
const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 HTTP sunucusu çalışıyor: http://localhost:${PORT}`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
});
