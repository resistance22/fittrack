const DB = require('../db')
const {
  DatabaseError,
  HTTPError
} = require('../errors')
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
      throw DatabaseError(e.message)
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
      throw new DatabaseError(e.message)
    }
  }

  static async getOneByID (weightID) {
    try {
      const query = await DB.query(`SELECT * FROM weight
        WHERE "ID"=$1
      `, [weightID])
      if (query.rowCount === 0) {
        throw new HTTPError('No weight was found with this id', 404)
      }
      return new Weight({
        ID: query.rows[0].ID,
        userID: query.rows[0].user_id,
        entryDate: query.rows[0].entrydate,
        weight: query.rows[0].weight
      })
    } catch (e) {
      // TODO: log the error
      throw new DatabaseError(e.message)
    }
  }

  static async getAllByUser (userID) {
    try {
      const query = await DB.query(`SELECT * FROM weights
        WHERE user_id=$1
      `, [userID])
      return query.rows
    } catch (e) {
      // TODO: log the error
      throw new DatabaseError(e.message)
    }
  }

  static async deleteByID (weightID, userID) {
    try {
      const query = await DB.query('DELETE FROM weight WHERE "ID"=$1 AND "user_id"=$2 RETURNING *', [
        weightID, // $1
        userID // $2
      ])
      if (query.rowCount === 0) {
        throw new HTTPError('No weight was found with this id', 404)
      }
      return query.rows[0]
    } catch (e) {
      throw new DatabaseError(e.message)
    }
  }
}

module.exports = Weight
