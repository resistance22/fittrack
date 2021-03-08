const DB = require('../db');
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
    this.password = password;
    this.email = email;
    this.phonenumber = phonenumber;
    this.first_name = firstName;
    this.last_name = lastName;
    this.height = height;
    this.gender = gender;
    this.bio = bio;
  }
  /**
   * To save the new user into database
   * @return {newUser}
   */
  async save() {
    try {
      const newUser = await DB.query(`INSERT INTO users(
        password,
        email,
        phonenumber,
        first_name,
        last_name,
        gender,
        bio) VALUES ($1,$2,$3,$4,$5,$6,$7)`, [
        this.password,
        this.email,
        this.phonenumber,
        this.first_name,
        this.last_name,
        this.gender,
      ]);
      return newUser;
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * @param  {int} id where conditions
   */
  static async findbyID(id) {
    try {
      const user = DB.query('SELECT * FROM users WHERE ID=$1', [id]);
      return user;
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
      const user = DB.query('SELECT * FROM users WHERE email=$1', [email]);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = User;
