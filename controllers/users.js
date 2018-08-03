const { User } = require("../models");

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  User.find({ username: username })
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUserByUsername };
