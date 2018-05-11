import Coupon from '../models/coupon';

export const createCoupon = (req, res, next) => {
  // validate input

  let newCoupon = Coupon(req.body);

  newCoupon.save((err) => {
    if(err) return next(err);
    return res.sendStatus(200);
  });
};

export const getCoupons = (req, res, next) => {
  Coupon.find({}, (err, coupons) => {
    if(err) return next(err);
    return res.json(coupons);
  });
};

export const getActiveCoupons = (req, res, next) => {
  let now = new Date();
  Coupon.find({
    $and: [
      {startDate: {$lt: now}},
      {$or: [
        {endDate: {$gt: now}},
        {endDate: {$exists: false}}
      ]},
      {approvedDate: {$exists: true}}
    ]
  }, (err, coupons) => {
    if(err) return next(err);
    return res.json(coupons);
  });
};

export const getUnapprovedCoupons = (req, res, next) => {
  Coupon.find({
    approvedDate: {$exists: false}
  }, (err, coupons) => {
    if(err) return next(err);
    return res.json(coupons);
  });
};

export const approveCoupon = (req, res, next) => {
  Coupon.findOneAndUpdate(
    req.params.id,
    {approvedDate: new Date()},
    {new: true},
    (err, coupon) => {
      if(err) return next(err);
      if(!coupon) return res.status(404).send('No coupon with that ID');
      return res.json(coupon);
    }
  );
};

export const getCouponById = (req, res, next) => {
  Coupon.findById(req.params.id, (err, coupon) => {
    if(err) return next(err);
    if(!coupon) return res.status(404).send('No coupon with that ID');
    return res.json(coupon);
  });
};

export const updateCoupon = (req, res, next) => {
  Coupon.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, coupon) => {
    if(err) return next(err);
    if(!coupon) return res.status(404).send('No coupon with that ID');
    return res.json(coupon);
  });
};

export const deleteCouponById = (req, res, next) => {
  Coupon.findOneAndRemove(req.params.id, (err, coupon) => {
    if(err) return next(err);
    if(!coupon) return res.status(404).send('No coupon with that ID');
    return res.sendStatus(200);
  });
};
