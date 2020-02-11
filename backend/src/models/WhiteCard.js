const mongoose = require('mongoose');

const WhiteCardSchema = new mongoose.Schema({
    text: String,
    watermark: String
})

module.exports = mongoose.model('WhiteCard', WhiteCardSchema);