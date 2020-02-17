const BlackCard = require('../models/BlackCard')

module.exports = {
    async index(req, res) {
        const cards = await BlackCard.find()
        return res.json(cards);
    },
    async store(req, res) {
        const { text, watermark, draw } = req.body

        const card = await BlackCard.create({
            draw,
            text,
            watermark
        });

        return res.json(card);
    }
}