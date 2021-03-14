const UserModel = require('../../models/userModel');


module.exports = {
  /**
   * register api controller
   * @api /api/register
   * @param  {Object} req
   * @param  {Object} res
   */
  post: async (req, res) => {
    const {
      email,
      phonenumber,
      firstName,
      lastName,
      height,
      gender,
      password,
    } = req.body;
    // check if necassary data is present
    if ( !( email && phonenumber && height && gender && password ) ) {
      return res.status(422).json({
        error: 'missing value',
      });
    }
    const exists = await UserModel.isEmailOrPhonenumberDuplicate(
        email,
        phonenumber,
    );
    if ( exists ) {
      return res.status(409).json({
        error: 'email or phonenumber already exists',
      });
    }

    let newUser = new UserModel({
      password,
      email,
      phonenumber,
      firstName,
      lastName,
      height,
      gender,
    });
    newUser = await newUser.save();
    if ( newUser ) {
      res.status(200).json(req.body);
    } else {
      res.status(500).json({error: 'someting went wrong!'});
    }
  },
};
