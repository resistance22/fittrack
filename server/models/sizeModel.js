/**
 * Size Model
 */
class Size {
  /**
     * @constructor
     * @param  {int} userID
     * @param  {Date} entryDate
     * @param  {int} waist
     * @param  {int} arm
     * @param  {int} hips
     * @param  {int} chest
     */
  constructor (userID, entryDate, waist, arm, hips, chest) {
    this.user = userID
    this.entryDate = entryDate
    this.waist = waist
    this.arm = arm
    this.hips = hips
    this.chest = chest
  }
}

module.exports = Size
