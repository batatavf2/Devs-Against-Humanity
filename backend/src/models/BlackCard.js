const mongoose = require('mongoose');

const BlackCardSchema = new mongoose.Schema({
    draw: Number,
    text: String,
    watermark: String
})

module.exports = mongoose.model('BlackCard', BlackCardSchema);