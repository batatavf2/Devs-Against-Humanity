const WhiteCard = require('../models/WhiteCard')

module.exports = {
    async index() {
        const cards = await WhiteCard.find()
        return cards;
    },
    async store(req ,res) {
        const { text, watermark } = req.body

        const card = await WhiteCard.create({
            text,
            watermark
        });

        return res.json(card);
    }
}