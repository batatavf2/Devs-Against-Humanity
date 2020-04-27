const createGame = require('./index')
const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://admin:admin@cluster0-wqv9y.mongodb.net/devs-against-humanity?retryWrites=true&w=majority'
// const connectionString = 'mongodb+srv://admin:admin@cluster0-wqv9y.mongodb.net/test'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

async function init() {
    const game = createGame()
    game.addPlayer('vini')
    game.addPlayer('crack')
    // game.removePlayer('crack')
    // console.log('before', game.state)
    await game.start()
    // console.log('players', game.state.players)
    game.playTurn()
    return
}

init()