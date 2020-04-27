const mongoose = require('mongoose');

const BlackCardSchema = new mongoose.Schema({
    draw: Number,
    text: String,
    deck: String
})

module.exports = mongoose.model('BlackCard', BlackCardSchema);