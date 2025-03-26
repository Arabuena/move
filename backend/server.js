const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Move API!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 