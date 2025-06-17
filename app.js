const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');
const kullaniciRoutes = require('./routes/kullaniciRoutes');
const takipRoutes = require('./routes/takipRoutes'); 
const hedefler=require('./routes/hedefler');

const app = express();

app.use(cors());
app.use(express.json());

// Route kullanımları
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/kullanici', kullaniciRoutes);
app.use('/api/takip', takipRoutes); 
app.use('/api/hedefler', hedefler);

// DB test
app.get('/test-db', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT GETDATE() AS Zaman');
    res.json(result.recordset);
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).send('Bağlantı hatası');
  }
});

module.exports = app;
