import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import * as users from '../controllers/users';
import * as coupons from '../controllers/coupons';

let app = express();

let uri = `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.port}/${config.db.name}?authSource=admin`;
mongoose.connect(uri, config.db.options);

if(app.get('env') === 'development') var dev = true;
// log if in dev mode
if(dev) app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// =================================================
// More Middleware
// =================================================

app.param('id', (req, res, next, id) => {
  if(!id.match(/^[a-fA-F0-9]{24}$/))
    return res.status(400).send('Invalid Id');
  else next();
});

//==================================================
// Routes
//==================================================
app.get('/users', users.getUsers);
app.get('/users/:id', users.getUserById);
app.post('/users', users.createUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUserById);

app.get('/coupons', coupons.getCoupons);
app.get('/coupons/active', coupons.getActiveCoupons);
app.get('/coupons/unapproved', coupons.getUnapprovedCoupons);
app.put('/coupons/:id/approve', coupons.approveCoupon);
app.get('/coupons/:id', coupons.getCouponById);
app.post('/coupons', coupons.createCoupon);
app.put('/coupons/:id', coupons.updateCoupon);
app.delete('/coupons/:id', coupons.deleteCouponById);





// handle 404
app.use((req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

// development error handler
if(dev) {
  app.use((err, req, res, next) => {
    console.log('\x1b[31m%s\x1b[0m', err);
    res.status(err.status || 500).send();
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});

app.listen(config.app.port, () => {
  console.log(`Listening at http://localhost:${config.app.port} in ${app.get('env')} mode`);
});
