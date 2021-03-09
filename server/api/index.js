const express = require('express');
const controllers = require('../controllers');
// eslint-disable-next-line new-cap
const router = express.Router();

module.exports = () => {
  // register api endpoint
  router.post('/register', controllers.api.register.post);
  return router;
};
