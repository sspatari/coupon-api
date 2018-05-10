import mongoose from 'mongoose';

let couponSchema = new mongoose.Schema({
  // define schema here
  name: {type: String, required: true, trim: true},
  url: {type: String, required: true, trim: true},
  companyName: {type: String, required: true, trim: true},
  startDate: {type: Date, default: Date.now, index: true},
  endDate: {type: Date, index: true},
  tags: [Number],
  clicks: {type: [Date], default: []},
  views: {type: [Date], default: []},
  redeemed: {type: [Date], default: []},
  postedBy: {type:mongoose.Schema.ObjectId, ref:'User', required: true},
  approvedDate: Date
},
{
  toObject: { getters: true },
  timeStamps: {
    createAt: 'createDate',
    updateAt: 'updateDate'
  }
});

couponSchema.pre('save', function(callback) {
  // run hook here
  // ensure url starts with http://, https://, ftp://
  if (this.url && !(/^((https?)|(ftp)):\/\/.+/.test(this.url)))
    this.url = 'http://' + this.url;
  // update startDate on approval
  if (this.isModified('approvedDate') && this.approvedDate > this.startDate)
    this.startDate = this.approvedDate;

  callback();
});

let Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
