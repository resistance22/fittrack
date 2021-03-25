const WeightModel = require('../../models/weightModel')
const {
  DatabaseError,
  HTTPError
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
    try {
      const savedWeight = await newWeight.save()
      return res.status(200).json({ savedWeight })
    } catch (e) {
      if (e instanceof DatabaseError) {
        res.sendStatus(500)
      }
    }
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
    try {
      const newWeight = await WeightModel.getOneByID(weightID)
      newWeight.weight = weight
      newWeight.date = date
      try {
        await newWeight.update()
        return res.sendStatus(200)
      } catch (e) {
        if (e instanceof DatabaseError) {
          res.sendStatus(500)
        }
        if (e instanceof HTTPError) {
          res.sendStatus(e.status)
        }
      }
    } catch (e) {
      if (e instanceof DatabaseError) {
        res.sendStatus(500)
      }
      if (e instanceof HTTPError) {
        res.sendStatus(e.status)
      }
    }
  },
  delete: async (req, res) => {
    const userID = req.user.id
    const { weightID } = req.params
    try {
      const deleted = await WeightModel.deleteByID(weightID, userID)
      return res.statud(200).json(deleted)
    } catch (e) {
      if (e instanceof DatabaseError) {
        res.sendStatus(500)
      }
      if (e instanceof HTTPError) {
        res.sendStatus(e.status)
      }
    }
  }
}
