const express = require('express')
const controllers = require('../controllers')
const authenticateUser = require('../auth')
// eslint-disable-next-line new-cap
const router = express.Router()

module.exports = () => {
  router.post('/register', controllers.api.register.post)
  router.post('/login', controllers.api.login.post)
  router.post('/weights', authenticateUser, controllers.api.weights.post)
  router.get('/weights', authenticateUser, controllers.api.weights.get)
  router.put('/weights', authenticateUser, controllers.api.weights.put)
  router.delete('/weights/:weightID', authenticateUser, controllers.api.weights.delete)
  return router
}
