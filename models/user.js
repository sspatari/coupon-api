import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  // define schema here
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  classYear: Number,
  email: {type: String, unique:true, sparse: true, trim: true},
  phone: {type: String, unique: true, sparse: true},
  phoneProvider: {type: String, trim: true},
  interests: [Number],
  isAdmin: {type: Boolean, index: true},
  isSuperAdmin: {type: Boolean, index: true},
  hash: String,
  companyName: {type: String, trim: true},
  token: String
},
{
  toObject: { getters: true },
  timeStamps: {
    createAt: 'createDate',
    updateAt: 'updateDate'
  }
});

// hash if admin, ensure phone and provider if not
userSchema.pre('save', (callback) => {
  if (this.isAdmin || this.isSuperAdmin) {
    if (!this.email)
      return callback(new Error('Missing email'));
    if (!this.hash)
      return callback(new Error('Missing password'));
    if (!this.companyName)
      return callback(new Error('Missing companyName'));

      // TODO hash
  }
  else {
    if (!this.phone)
      return callback(new Error('Missing phone'));
    if (!this.phoneProvider)
      return callback(new Error('Missing phoneProvider'));
  }

  // validate phone
  if (this.phone) {
    if (typeof this.phone !== 'string')
      return callback(new Error('Invalid phone'));
    let phone = '';
    for (let i = 0; i < this.phone.length; i++) {
      if (!isNaN(this.phone[i]))
        phone += this.phone[i];
    }
    if (phone.length !== 10)
      return callback(new Error('Invalid phone'));
    this.phone = phone;
  }

  callback();
});

// create full name
userSchema.virtual('name').get(function() {
  let name = '';
  if (this.firstName) {
    name = this.firstName;
    if (this.lastName) name += ' ' + this.lastName;
  } else if (this.lastName) name = this.lastName;
  return name;
});

// create any methods
userSchema.methods.greet = () => {
  console.log('hi!' + this.firstName);
};
//TODO method to check hashed password
userSchema.methods.comparePassword = (pw) => {
  return this.hash === pw;
};

let User = mongoose.model('User', userSchema);

export default User;
