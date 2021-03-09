const registerControllers = require('./api/registerController');
const testAPIController = require('./api/testController');
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
    test: {
      get: testAPIController.get,
    },
    register: {
      post: registerControllers.post,
    },
  },
};
