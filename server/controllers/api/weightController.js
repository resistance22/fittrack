const WeightModel = require('../../models/weightModel')
const {
  DatabaseError
} = require('../../errors')
module.exports = {
  post: async (req, res) => {
    const userID = req.user.id
    const { weight, entryDate } = req.body
    if (!(weight)) {
      return res.status(422).json({
        error: 'missing value'
      })
    }
    const newWeight = new WeightModel({
      userID: userID,
      weight: weight,
      entryDate: entryDate
    })
    const savedWeight = await newWeight.save()
    if (!savedWeight) return res.sendStatus(500)

    return res.status(200).json({ savedWeight })
  },
  getAll: async (req, res) => {
    const userID = req.user.id
    try {
      const weights = await WeightModel.getAllByUser(userID)
      res.status(200).json(weights)
    } catch (e) {
      if (e instanceof DatabaseError) {
        res.sendStatus(500)
      }
    }
  },
  put: async (req, res) => {
    const { weightID, weight, date } = req.body
    const newWeight = await WeightModel.getOneByID(weightID)
    if (!newWeight) return res.sendStatus(404)
    newWeight.weight = weight
    newWeight.date = date
    const updateResult = await newWeight.update()
    if (!updateResult) return res.sendStatus(500)
    return res.sendStatus(200)
  },
  delete: async (req, res) => {
    const userID = req.user.id
    const { weightID } = req.params
    const deleted = await WeightModel.deleteByID(weightID, userID)
    if (deleted === 0) return res.sendStatus(404)
    if (deleted === null) return res.sendStatus(500)
    return res.json(deleted)
  }
}
