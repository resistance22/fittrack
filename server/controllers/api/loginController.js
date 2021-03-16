const UserModel = require('../../models/userModel')
const jwt = require('jsonwebtoken')
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
      password
    } = req.body
    // check if necassary data is present
    if (!((email || phonenumber) && password)) {
      return res.status(422).json({
        error: 'missing value'
      })
    }
    const user = await UserModel.findOneByEmailOrPhonenumber(
      email,
      phonenumber
    )
    if (!user) {
      return res.status(401).json({
        error: 'wrong email or phone number'
      })
    }
    if (!(await user.isUserPasswordCorrect(password))) {
      return res.status(401).json({
        error: 'wrong password'
      })
    }
    const token = jwt.sign({
      id: user.ID,
      email: user.email,
      phonenumber: user.phonenumber
    }, process.env.JWT_SECRET)
    return res.status(200).json({
      token: token
    })
  }
}
