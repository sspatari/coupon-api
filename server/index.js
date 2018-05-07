import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from './config';
import * as users from '../controllers/users';

let app = express();

if(app.get('env') === 'development') var dev = true;
// log if in dev mode
if(dev) app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//==================================================
// Routes
//==================================================
app.get('/users', users.getUsers);
app.get('/users/:id', users.getUserById);
app.post('/users', users.createUser);

// handle 404
app.use((req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

// development error handler
if(dev) {
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send();
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});


app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port} in ${app.get('env')} mode`);
});
