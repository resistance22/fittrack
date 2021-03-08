module.exports = {
  home: {
    get: (req, res) => {
      res.render('home', {
        title: 'Fitrack',
      });
    },
  },
};
