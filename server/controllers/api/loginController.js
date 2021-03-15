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
      password,
    } = req.body;
    // check if necassary data is present
    if ( !( (email || phonenumber) && password ) ) {
      return res.status(422).json({
        error: 'missing value',
      });
    }
  },
};
