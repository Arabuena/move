// Load env vars first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const mongoose = require('mongoose');

// Validate required env vars
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI não está definido');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET não está definido');
  process.exit(1);
}

// Connect to database
connectDB();

const app = express();

// CORS config
app.use(cors({
  origin: ['http://localhost:3000', 'https://move-app.onrender.com'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Move API!' });
});

// Teste de conexão com o MongoDB
app.get('/api/test-db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.collections();
    res.json({ 
      message: 'Conexão com MongoDB estabelecida',
      collections: collections.map(c => c.collectionName)
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao conectar com MongoDB',
      details: error.message 
    });
  }
});

// Rotas da API
app.use('/api/auth', require('./routes/authRoutes'));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/out')));

// All non-API routes redirect to frontend
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 