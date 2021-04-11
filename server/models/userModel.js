const DB = require('../db')
const bcrypt = require('bcrypt')
const { DatabaseError, HTTPError } = require('../errors')
/**
 * User Model
 */
class User {
  constructor (userData) {
    this.ID = userData.ID
    this.email = userData.email
    this.phonenumber = userData.phonenumber
    this.first_name = userData.firstName
    this.last_name = userData.lastName
    this.height = userData.height
    this.gender = userData.gender
    this.bio = userData.bio
    if (userData.password) {
      this.password = userData.password
    } else {
      this._password = null
    }
  }

  set password (plainPassword) {
    const encryptedNewPass = bcrypt.hashSync(plainPassword, 10)
    this._password = encryptedNewPass
  }

  get password () {
    return this._password
  }

  _setPassword (PlainPassword) {
    this._password = PlainPassword
  }

  /**
   * @param  {String} email
   */
  static async findOneByEmail (email) {
    try {
      const query = await DB.query('SELECT * FROM users WHERE email=$1', [
        email
      ])
      if (query.rowCount === 0) {
        throw new HTTPError('Not Found!', 404)
      }
      const user = new User({
        ID: query.rows[0].ID,
        email: query.rows[0].email,
        phonenumber: query.rows[0].phonenumber,
        firstName: query.rows[0].first_name,
        lastName: query.rows[0].last_name,
        height: query.rows[0].height,
        gender: query.rows[0].gender,
        bio: query.rows[0].bio
      })
      user._setPassword(query.rows[0].password)
      return user
    } catch (e) {
      // TODO: log the error
      throw new DatabaseError(e.message)
    }
  }

  static async findOneByEmailOrPhonenumber (email, phonenumber) {
    try {
      // eslint-disable-next-line max-len
      const query = await DB.query('SELECT * FROM users WHERE email=$1 OR phonenumber=$2', [
        email, // $1
        phonenumber // $2
      ])
      if (query.rowCount > 0) {
        const user = new User({
          ID: query.rows[0].ID,
          email: query.rows[0].email,
          phonenumber: query.rows[0].phonenumber,
          firstName: query.rows[0].first_name,
          lastName: query.rows[0].last_name,
          height: query.rows[0].height,
          gender: query.rows[0].gender,
          bio: query.rows[0].bio
        })
        user._setPassword(query.rows[0].password)
        return user
      }
      return null
    } catch (e) {
      // TODO: log the error
      throw new DatabaseError(e.message)
    }
  }

  static async isEmailOrPhonenumberDuplicate (email, phonenumber) {
    try {
      const user = await DB.query(
        'SELECT * FROM users WHERE email=$1 OR phonenumber=$2', [
          email, // $1
          phonenumber // $2
        ]
      )
      return user.rowCount > 0
    } catch (e) {
      // TODO: log the error
      throw new DatabaseError(e.message)
    }
  }

  async isUserPasswordCorrect (plainPassword) {
    return await bcrypt.compare(plainPassword, this._password)
  }

  async save () {
    try {
      const newUser = await DB.query(`INSERT INTO users(
          password,
          email,
          phonenumber,
          first_name,
          last_name,
          gender,
          height
          ) VALUES ($1,$2,$3,$4,$5,$6,$7)  RETURNING *`, [
        this.password, // $1
        this.email, // $2
        this.phonenumber, // $3
        this.first_name, // $4
        this.last_name, // $5
        this.gender, // $6
        this.height // $7
      ])
      return newUser.rows[0]
    } catch (e) {
      // TODO: log the error
      throw new DatabaseError(e.message)
    }
  }

  async update () {
    try {
      const query = await DB.query(`UPDATE users SET
          password=$1,
          email=$2,
          phonenumber=$3,
          first_name=$4,
          last_name=$5,
          gender=$6,
          height=$7,
          bio=$8
          WHERE ID=$9`, [
        this.password, // $1
        this.email, // $2
        this.phonenumber, // $3
        this.first_name, // $4
        this.last_name, // $5
        this.gender, // $6
        this.height, // $7
        this.bio, // $8
        this.id // $9
      ])
      return query.rows[0]
    } catch (e) {
      // TODO: log the error
      throw new DatabaseError(e.message)
    }
  }
} // end of class

module.exports = User
