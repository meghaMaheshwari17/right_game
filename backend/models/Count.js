const mongoose = require('mongoose');


const CountSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now, unique: true },
    right: { type: Number, default: 0 },
    haina: { type: Number, default: 0 },
    basically: { type: Number, default: 0 }
});

module.exports = mongoose.model('Count', CountSchema);