import config from './config';
import apiRouter from './api';
import express from 'express';
var bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(bodyParser.json({limit: '50mb'}));
server.set('view engine', 'ejs');
server.get('/', (req, res) => {
  	res.render('index');
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, () => {
  	console.info('Express listening on port', config.port);
});
