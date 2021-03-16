const express = require('express')
const controllers = require('../controllers')
// eslint-disable-next-line new-cap
const router = express.Router()

module.exports = () => {
  router.get('/', controllers.home.get)
  return router
}
