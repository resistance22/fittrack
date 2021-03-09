const registerControllers = require('./api/registerController');
module.exports = {
  // Home Route Controllers
  home: {
    get: (req, res) => {
      res.render('home', {
        title: 'Fitrack',
      });
    },
  },
  // All api controllers
  api: {
    register: {
      post: registerControllers.post,
    },
  },
};
