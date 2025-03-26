const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Cria novo usuário
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await user.save();

    // Gera token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca usuário com senha
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Verifica senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gera token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 