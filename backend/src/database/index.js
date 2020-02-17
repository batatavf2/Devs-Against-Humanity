const mongoose = require('mongoose');
const sqlite3 = require('sqlite3')
const WhiteCard = require('../models/WhiteCard')
const BlackCard = require('../models/BlackCard')
const Deck = require('../models/Deck')

const connectionString = 'mongodb+srv://admin:admin@cluster0-wqv9y.mongodb.net/devs-against-humanity?retryWrites=true&w=majority'
// const connectionString = 'mongodb+srv://admin:admin@cluster0-wqv9y.mongodb.net/test'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = new sqlite3.Database('./pyx.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('connected')
    }
});


importBlackCardsFromSQLite(db)
importWhiteCardsFromSQLite(db)


async function importBlackCardsFromSQLite(db) {
    const queryblack = 'SELECT * FROM black_cards;'
    db.all(queryblack, [], (err, rows) => {
        if (err) {
            throw err
        }
        rows.forEach(async row => {
            // console.log(row)
            const { watermark: deck, text, pick: draw } = row
            await checkOrCreateDeck(deck)
            const card = await BlackCard.create({
                deck,
                text,
                draw
            })
            console.log(`Created black card: ${card.text}`)
        })
    })
    return
}

async function importWhiteCardsFromSQLite(db) {
    const querywhite = 'SELECT * FROM white_cards;'
    db.all(querywhite, [], (err, rows) => {
        if (err) {
            throw err
        }
        rows.forEach(async row => {
            const { watermark: deck, text } = row
            await checkOrCreateDeck(deck)
            const card = await WhiteCard.create({
                deck,
                text
            })
            console.log(`Created white card: ${card.text}`)
        })
    })
    return
}

async function checkOrCreateDeck(name) {
    let deck = await Deck.findOne({ name });
    if(!deck) {
        console.log(`Deck created: ${name}`)
        deck = await Deck.create({ name })
    }
    return
}