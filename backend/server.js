const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Move API!' });
});

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend/out')));

// Todas as outras rotas não-API redirecionam para o frontend
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 