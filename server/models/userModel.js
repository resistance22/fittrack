const DB = require('../db');
const bcrypt = require('bcrypt');
/**
 * User Model
 */
class User {
  /**
   * The constructor for User Model
   * @constructor
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
      password,
      email,
      phonenumber,
      firstName=null,
      lastName=null,
      height,
      gender,
      bio=null,
  ) {
    this.email = email;
    this.phonenumber = phonenumber;
    this.first_name = firstName;
    this.last_name = lastName;
    this.height = height;
    this.gender = gender;
    this.bio = bio;
    this.password = password;
  }
  /**
   * To save the new user into database
   * @return {newUser}
   */
  async save() {
    try {
      const pass = await bcrypt.hash(this.password, 10);
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
   * @param  {int} id where conditions
   */
  static async findbyID(id) {
    try {
      const user = DB.query('SELECT * FROM users WHERE ID=$1', [id]);
      return {
        count: user.rowCount,
        rows: user.rows,
      };
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * find user by email
   * @param  {String} email
   * @return {user} user
   */
  static async findbyEmail(email) {
    try {
      const user = await DB.query(
          'SELECT * FROM users WHERE email=$1', [email],
      );
      return {
        count: user.rowCount,
        rows: user.rows,
      };
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
}

module.exports = User;
