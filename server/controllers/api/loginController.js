const UserModel = require('../../models/userModel');


module.exports = {
  /**
   * register api controller
   * @api /api/login
   * @param  {Object} req
   * @param  {Object} res
   */
  post: async (req, res) => {
    const {
      email,
      phonenumber,
      password,
    } = req.body;
    // check if necassary data is present
    if ( !( (email || phonenumber) && password ) ) {
      return res.status(422).json({
        error: 'missing value',
      });
    }
    const user = await UserModel.findOneByEmailOrPhonenumber(
        email,
        phonenumber,
    );
    if ( user ) {
      const isPasswordCorrect = await user.isUserPasswordCorrect(password);
      if ( isPasswordCorrect) {
        return res.status(200).json({
          id: user.ID,
          email: user.email,
          phonenumber: user.phonenumber,
        });
      } else {
        return res.status(401).json({
          error: 'wrong password',
        });
      }
    } else {
      return res.status(401).json({
        error: 'wrong email or phone number',
      });
    }
  },
};
