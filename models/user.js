import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  // define schema here
  firstName: String,
  lastName: String,
  address: String,
  classYear: Number,
  email: String,
  phone: String,
  phoneProvider: String,
  venmo: String,
  isAdmin: Boolean,
  isSuperAdmin: Boolean,
  hash: String,
  companyName: String,
  interests: [String],
  timeSpent: Number
},
{
  toObject: { getters: true },
  timeStamps: {
    createAt: 'createDate',
    updateAt: 'updateDate'
  }
});

userSchema.pre('save', (callback) => {
  // run hook here
  if(this.isAdmin) {
    if(!this.hash && !this.password)
      throw new Error('No hash');
    this.hash = this.hash || this.password;

    //TODO hash the pw

  } else {
    // non-admins
    if(!this.phone)
      throw new Error('Missing phone');

    // TODO ensure phone number is actually legit

    if(!this.phoneProvider)
      throw new Error('Missing provider');
  }
  callback();
});

// create any methods
userSchema.methods.greet = () => {
  console.log('hi!' + this.firstName);
};
//TODO method to check hashed password
userSchema.methods.checkPassword = (pw) => {
  return this.hash === pw;
};

let User = mongoose.model('User', userSchema);

export default User;
