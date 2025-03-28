// Load env vars first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

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
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Headers de segurança
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// Middleware para processar formulários
app.use(express.urlencoded({ extended: true }));

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

// Rota para renderizar o formulário
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

// Rota para processar o login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validação básica
    if (!email || !password) {
      return res.redirect('/login?error=Preencha todos os campos');
    }

    // Busca usuário no banco
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/login?error=Usuário não encontrado');
    }

    // Verifica senha
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.redirect('/login?error=Senha incorreta');
    }

    // Gera token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Redireciona com token
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/passenger/home');
  } catch (error) {
    console.error('Erro no login:', error);
    res.redirect('/login?error=Erro ao fazer login');
  }
});

// Rota para página de registro
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/register.html'));
});

// Rota para processar o registro
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Validação básica
    if (!name || !email || !phone || !password) {
      return res.redirect('/register?error=Preencha todos os campos');
    }

    // Verifica se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect('/register?error=Email já cadastrado');
    }

    // Cria novo usuário
    const user = new User({
      name,
      email,
      phone,
      password // será hasheada pelo middleware do mongoose
    });
    await user.save();

    // Gera token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Redireciona com token
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/passenger/home');
  } catch (error) {
    console.error('Erro no registro:', error);
    res.redirect('/register?error=Erro ao criar conta');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 