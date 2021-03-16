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
  constructor (userID, entryDate, weight) {
    this.user = userID
    this.entryDate = entryDate
    this.weight = weight
  }
}

module.exports = Weight
