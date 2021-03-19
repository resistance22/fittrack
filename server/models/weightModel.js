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

  async update () {
    try {
      const query = await DB.query(`UPDATE weight SET
          weight = $1,
          entrydate = $2
          WHERE "ID"=$3 RETURNING *`, [
        this.weight, // $1
        this.entryDate, // $2
        this.ID // $3
      ])
      return query.rows[0]
    } catch (e) {
      // TODO: log the error
      console.error(e)
      return null
    }
  }

  static async getOneByID (weightID) {
    try {
      const query = await DB.query(`SELECT * FROM weight
        WHERE "ID"=$1
      `, [weightID])
      return new Weight({
        ID: query.rows[0].ID,
        userID: query.rows[0].user_id,
        entryDate: query.rows[0].entrydate,
        weight: query.rows[0].weight
      })
    } catch (e) {
      // TODO: log the error
      console.error(e)
      return null
    }
  }

  static async getAllByUser (userID) {
    try {
      const query = await DB.query(`SELECT * FROM weight
        WHERE user_id=$1
      `, [userID])
      return query.rows
    } catch (e) {
      // TODO: log the error
      console.error(e)
      return null
    }
  }
}

module.exports = Weight
