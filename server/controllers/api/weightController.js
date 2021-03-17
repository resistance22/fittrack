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
  }
}
