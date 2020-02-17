const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('Deck', DeckSchema);