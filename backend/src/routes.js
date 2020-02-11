const { Router } = require('express');
const BlackCardController = require('./controllers/BlackCardController');
// const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/cards', BlackCardController.index);
routes.post('/cards', BlackCardController.store);

module.exports = routes;