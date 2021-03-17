const DB = require('../db')
/**
 * Weight Model
 */
class Weight {
  /**
     * @constructor
     * @param  {int} userID
     * @param  {Date} entryDate
     * @param  {float} weight
     */
  constructor ({ ID, userID, entryDate, weight }) {
    this.ID = ID
    this.userID = userID
    this.entryDate = entryDate
    this.weight = weight
  }

  async save () {
    try {
      const newUser = await DB.query(`INSERT INTO weight(
          user_id,
          weight,
          entrydate
          ) VALUES ($1,$2,$3)  RETURNING *`, [
        this.userID, // $1
        this.weight, // $2
        this.entryDate // $3
      ])
      return newUser.rows[0]
    } catch (e) {
      // TODO: log the error
      console.log(e)
      return null
    }
  }
}

module.exports = Weight
