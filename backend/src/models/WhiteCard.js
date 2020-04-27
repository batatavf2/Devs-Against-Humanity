const mongoose = require('mongoose');

const WhiteCardSchema = new mongoose.Schema({
    text: String,
    deck: String
})

module.exports = mongoose.model('WhiteCard', WhiteCardSchema);