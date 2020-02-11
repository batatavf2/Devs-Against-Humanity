const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const app = express();
const server = http.createServer(app)

const connectionString = 'mongodb+srv://admin:admin@cluster0-wqv9y.mongodb.net/devs-against-humanity?retryWrites=true&w=majority'
// const connectionString = 'mongodb+srv://admin:admin@cluster0-wqv9y.mongodb.net/test'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);