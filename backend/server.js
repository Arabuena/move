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

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS config - ANTES de todas as rotas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://move-k987.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Responde OPTIONS imediatamente
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Rotas da API
app.use('/api', require('./routes/api'));

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, '../frontend/out')));

// Rota catch-all para SPA
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