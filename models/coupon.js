import mongoose from 'mongoose';

let couponSchema = new mongoose.Schema({
  // define schema here
  name: {type: String, required: true},
  url: {type: String, required: true},
  companyName: String,
  startDate: Date,
  endData: Date,
  tags: [String],
  clicks: [Date],
  views: [Date],
  redeems: [Date],
  postedBy: {type:mongoose.Schema.ObjectId, required: true},
  approvedDate: Date
},
{
  toObject: { getters: true },
  timeStamps: {
    createAt: 'createDate',
    updateAt: 'updateDate'
  }
});

couponSchema.pre('save', (callback) => {
  // run hook here
  if(!this.startDate) {
    this.startDate = new Date();
  }

  callback();
});

let Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
