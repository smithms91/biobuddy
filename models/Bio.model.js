const mongoose = require('mongoose');

const BiosCreated = new mongoose.Schema({
  biosCreated: {
    type: Number,
    required: true
  },
},
  { timestamps: true, strict: true },
);

let Bios;

try {
  Bios = mongoose.model('BiosCreated', BiosCreated);
} catch {
  Bios = mongoose.models['BiosCreated'];
}

module.exports = Bios