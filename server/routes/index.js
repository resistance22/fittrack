const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();


module.exports = () => {
  router.get('/', (req, res) => {
    res.render('home', {
      title: 'Fittrack',
    });
  });

  router.get('/test', (req, res) => {
    res.json({
      hello: 'world',
    });
  });
  return router;
};
