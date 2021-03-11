const DB = require('../db');
const bcrypt = require('bcrypt');
/**
 * User Model
 */
class User {
  /**
   * The constructor for User Model
   * @constructor
   * @param  {Integer} id user id
   * @param  {String} password user pasaword
   * @param  {String} email user email
   * @param  {String} phonenumber user phonenumber
   * @param  {String} firstName user firstName
   * @param  {String} lastName  user lastName
   * @param  {String} height user height
   * @param  {String} gender user gender
   * @param  {String} bio user bio
   */
  constructor(
      id=null,
      password,
      email,
      phonenumber,
      firstName=null,
      lastName=null,
      height,
      gender,
      bio=null,
  ) {
    this.id = id;
    this.email = email;
    this.phonenumber = phonenumber;
    this.first_name = firstName;
    this.last_name = lastName;
    this.height = height;
    this.gender = gender;
    this.bio = bio;
    this._password = password;
  }
  /**
   * @param  {String} email
   */
  static async findOneByEmail(email) {
    try {
      const query = await DB.query('SELECT * FROM users WHERE email=$1', [
        email,
      ]);
      return new User(
          query.rows[0].ID, // ID
          query.rows[0].password, // Pass
          query.rows[0].email, // email
          query.rows[0].phonenumber, // phone number
          query.rows[0].first_name, // first Name
          query.rows[0].last_name, // last Name
          query.rows[0].height, // height
          query.rows[0].gender, // gender
          query.rows[0].bio, // bio
      );
    } catch (e) {
      // TODO: log the error
      console.log(e);
    }
  }
  /**
   * @param  {int} id where conditions
   */
  static async findOnebyID(id) {
    try {
      const query = DB.query('SELECT * FROM users WHERE ID=$1', [id]);
      return new User(
          query.rows[0].ID, // ID
          query.rows[0].password, // Pass
          query.rows[0].email, // email
          query.rows[0].phonenumber, // phone number
          query.rows[0].first_name, // first Name
          query.rows[0].last_name, // last Name
          query.rows[0].height, // height
          query.rows[0].gender, // gender
          query.rows[0].bio, // bio
      );
    } catch (e) {
      // TODO: log the error
      console.log(e);
    }
  }
  /**
   * check if a user crudentials already exists
   * @param  {String} email
   * @param  {String} phonenumber
   */
  static async exists(email, phonenumber) {
    try {
      const user = await DB.query(
          'SELECT * FROM users WHERE email=$1 OR phonenumber=$2', [
            email, // $1
            phonenumber, // $2
          ],
      );
      return true ? user.rowCount > 0 : false;
    } catch (e) {
      // TODO: log the error
      console.log(e);
    }
  }

  /**
   * To save the new user into database
   * @return {newUser}
   */
  async save() {
    try {
      const pass = await bcrypt.hash(this._password, 10);
      const newUser = await DB.query(`INSERT INTO users(
          password,
          email,
          phonenumber,
          first_name,
          last_name,
          gender,
          height
          ) VALUES ($1,$2,$3,$4,$5,$6,$7)  RETURNING *`, [
        pass, // $1
        this.email, // $2
        this.phonenumber, // $3
        this.first_name, // $4
        this.last_name, // $5
        this.gender, // $6
        this.height, // $7
      ]);
      return newUser.rows[0];
    } catch (e) {
      // TODO: log the error
      console.log(e);
      return null;
    }
  }
  /**
   * updates the User Object Password
   * @param  {String} newPass
   */
  async setPassword(newPass) {
    const encryptedNewPass = await bcrypt.hash(newPass, 10);
    this._password = encryptedNewPass;
  }
}

module.exports = User;
