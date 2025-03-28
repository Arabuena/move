// Load env vars first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Connect to database
connectDB();

const app = express();

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rota raiz
app.get('/', (req, res) => {
  res.send('Hello from Move API!');
});

// Rota de ping
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Rota de teste - ANTES das outras rotas
app.post('/api/test/create-user', async (req, res) => {
  try {
    const testUser = new User({
      name: 'Usuário Teste',
      email: 'teste@example.com',
      phone: '11999999999',
      password: 'senha123'
    });

    await testUser.save();

    const token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: 'Usuário teste criado com sucesso',
      token,
      user: {
        id: testUser._id,
        name: testUser.name,
        email: testUser.email
      }
    });
  } catch (error) {
    console.error('Erro ao criar usuário teste:', error);
    res.status(500).json({ error: 'Erro ao criar usuário teste' });
  }
});

// Rota de teste GET - adicione logo após o middleware CORS
app.get('/api/test', (req, res) => {
  res.json({ message: 'API está funcionando!' });
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
      return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    // Verifica se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Cria novo usuário
    const user = new User({
      name,
      email,
      phone,
      password
    });
    await user.save();

    // Gera token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Retorna resposta JSON
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
});

const PORT = process.env.PORT || 8080;

// Inicia o servidor
const server = app.listen(PORT, () => {
  console.log('==================================');
  console.log(`Server running on port ${PORT}`);
  console.log('Server started at:', new Date().toISOString());
  console.log('==================================');
});

// Tratamento de erros
server.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}); 