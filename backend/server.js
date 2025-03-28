const express = require('express');
const app = express();

// Middleware básico
app.use(express.json());

// Log middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Rotas básicas
app.get('/', (req, res) => {
  try {
    res.type('text/plain').send('Hello from Move API!');
  } catch (error) {
    console.error('Error in root route:', error);
    res.status(500).send('Server error');
  }
});

app.get('/ping', (req, res) => {
  try {
    res.type('text/plain').send('pong');
  } catch (error) {
    console.error('Error in ping route:', error);
    res.status(500).send('Server error');
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

// Tratamento de erros do servidor
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}); 