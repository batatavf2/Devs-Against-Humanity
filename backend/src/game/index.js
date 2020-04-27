// const BlackCardController = require('./controllers/BlackCardController');
// const WhiteCardController = require('./controllers/WhiteCardController');
const mongoose = require('mongoose');
const shuffle = require('shuffle-array')
const BlackCard = require('../models/BlackCard')
const WhiteCard = require('../models/WhiteCard')

module.exports = function createGame() {
    const state = {
        players: {},
        blackDeck: [],
        whiteDeck: [],
        numberOfCards: 10
    }

    function addPlayer(nickname) {
        if (nickname in state.players) {
            return 'nickname already in use'
        }
        else {
            state.players[nickname] = {
                score: 0,
                cards: [],
                selectedCardIndex: 0,
            }
        }
    }

    function removePlayer(nickname) {
        try {
            delete state.players[nickname]
        }
        catch {
            console.log(`Could not find any player with the nickname "${nickname}"`)
        }
    }

    function playTurn() {
        let playedCards = {}
        for (nickname in state.players) {
            const cardIndex = state.players[nickname].selectedCardIndex
            const card = state.players[nickname].cards[cardIndex]
            console.log(`${nickname} played "${card.text}"`)
        }
    }

    async function giveCardsToPlayer(nickname, amount) {
        for (let i = 1; i <= amount; i++) {
            const deck = state.whiteDeck
            if (deck.length > 0) {
                const card = deck.pop()
                state.players[player].cards.push(card)
            }
            else {
                console.log(`Deck runned out of cards. Handled ${i-1} cards to ${nickname}`)
                return
            }
        }
        console.log(`Handled ${amount} cards to ${nickname}`)
    }

    async function start() {
        console.log('start')
        let whiteDeck = await WhiteCard.find({deck: 'US'})
        let blackDeck = await BlackCard.find({deck: 'US'})
        // console.log('decks', { whiteDeck, blackDeck })
        await shuffle(whiteDeck)
        await shuffle(blackDeck)
        state.whiteDeck = whiteDeck
        state.blackDeck = blackDeck

        for (player in state.players) {
            await giveCardsToPlayer(player, state.numberOfCards)
        }
        console.log({
            black: blackDeck.length,
            white: whiteDeck.length
        })
    }

    return {
        state,
        addPlayer,
        removePlayer,
        giveCardsToPlayer,
        start,
        playTurn
    }
}