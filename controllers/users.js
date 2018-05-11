import User from '../models/user';

export const createUser = (req, res, next) => {
  // validate input

  // create actual user
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    phoneProvider: req.body.phoneProvider,
    password: req.body.password,
    createdDate: new Date()
  };

  let newUser = new User(data);

  newUser.save((err) => {
    if(err) return next(err);
    return res.sendStatus(200);
  });
};

export const getUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) return next(err);
    return res.json(users);
  });
};

export const getUserById = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if(err) return next(err);
    if(!user) return res.status(404).send('No user with that ID');
    return res.json(user);
  });
};

export const updateUser = (req, res, next) => {
  User.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    if(err) return next(err);
    if(!user) return res.status(404).send('No user with that ID');
    return res.json();
  });
};

export const deleteUserById = (req, res, next) => {
  User.findOneAndRemove(req.params.id, (err, user) => {
    if(err) return next(err);
    if(!user) return res.status(404).send('No user with that ID');
    return res.sendStatus(200);
  });
};
