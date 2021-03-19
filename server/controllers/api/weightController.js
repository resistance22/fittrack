const WeightModel = require('../../models/weightModel')

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
    const weights = await WeightModel.getAllByUser(userID)
    res.status(200).json(weights)
  },
  put: async (req, res) => {
    const { weightID, weight, date } = req.body
    const newWeight = await WeightModel.getOneByID(weightID)
    newWeight.weight = weight
    newWeight.date = date
    const result = await newWeight.update()
    if (!result) {
      return res.sendStatus(500)
    }
    return res.sendStatus(200)
  }
}
