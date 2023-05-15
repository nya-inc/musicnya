/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { static as _static } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { format } from 'node:url';
import path, { join } from 'node:path';

// main app
const app = express();
const rendererAppName = 'musicnya';
app.use(bodyParser.json());
app.use(logger('dev'));
app.set('port', 3000);
app.set('view engine', 'ejs');

// db
// var db_infos = require('./db_infos');
// var db = require('mongoose');

// Angular
app.use(
  '/',
  _static(path.join(__dirname, path.join('..', rendererAppName + '/')))
);
app.listen(3000, function () {
  console.log('listening on port 3000...');
});

//pages
const app1 = express();
app1.use(bodyParser.json());
app1.use(logger('dev'));
app1.set('port', 4201);
app1.set('view engine', 'ejs');

// db
// var db_infos = require('./db_infos');
// var db = require('mongoose');

// Angular
app1.use('/', _static(path.join(__dirname, path.join('..', 'home' + '/'))));
app1.listen(4201, function () {
  console.log('listening on port 4201...');
});

//pages
const app2 = express();
app2.use(bodyParser.json());
app2.use(logger('dev'));
app2.set('port', 4201);
app2.set('view engine', 'ejs');

// db
// var db_infos = require('./db_infos');
// var db = require('mongoose');

// Angular
app2.use('/', _static(path.join(__dirname, path.join('..', 'search' + '/'))));
app2.listen(4202, function () {
  console.log('listening on port 4201...');
});
