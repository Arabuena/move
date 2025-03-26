const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  origin: {
    type: String,
    required: [true, 'Origem é obrigatória']
  },
  destination: {
    type: String,
    required: [true, 'Destino é obrigatório']
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ride', rideSchema); 