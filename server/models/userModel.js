/**
 * User Model
 */
class User {
  /**
   * The constructor for User Model
   * @constructor
   * @param  {String} password user pasaword
   * @param  {String} email user email
   * @param  {String} firstName user firstName
   * @param  {String} lastName  user lastName
   * @param  {String} height user height
   * @param  {String} gender user gender
   * @param  {String} bio user bio
   */
  constructor(
      password,
      email,
      firstName=null,
      lastName=null,
      height,
      gender,
      bio=null,
  ) {
    this.password = password;
    this.email = email;
    this.first_name = firstName;
    this.last_name = lastName;
    this.height = height;
    this.gender = gender;
    this.bio = bio;
  }
}

module.exports = User;
