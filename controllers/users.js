let userDb = [];
let idCounter = 0;

userDb.insertUser = function (user, callback) {
  user.id = idCounter;
  ++idCounter;
  console.log(this);
  this.push(user);

  callback();
};

userDb.getUserById = function(id, callback) {
  for (let i = 0; i < this.length; ++i) {
    if (id === this[i].id) {
      callback(this[i]);
    }
  }
};

export const createUser = (req, res) => {
  // validate input

  // create actual user
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    createdDate: new Date()
  };

  // store the user
  userDb.insertUser(newUser, () => {
    return res.send('it worked!!!!!');
  });
};

export const getUsers = (req, res) => {
  return res.send(userDb);
};

export const getUserById = (req, res) => {
  userDb.getUserById(req.params.id, (user) => {
    return res.json(user);
  });
};
