const UserModel = require('../../models/userModel');

module.exports = {
  // register controller function
  post: (req, res) => {
    const {
      email,
      phonenumber,
      first_name,
      last_name,
      height,
      gender,
    } = req.body;
    res.status(200).json(req.body);
  },
};
