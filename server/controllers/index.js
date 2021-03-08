const registerControllers = require('./api/registerController');
module.exports = {
  home: {
    get: (req, res) => {
      res.render('home', {
        title: 'Fitrack',
      });
    },
    api: {
      register: {
        post: registerControllers.post,
      },
    },
  },
};
