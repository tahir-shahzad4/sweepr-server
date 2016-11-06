var express = require('express');
var router = express.Router();

var Users = require('../models/index').Users;
var Group = require('../models/index').Group;


/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.find().then(function (users) {
    res.send(users)
  })
});

router.get('/:id', function(req, res, next) {
  Users.find({
    where: {
      id: req.params.id
    },
    include: [{model: Group}]
  }).then(function (user) {
    res.send(user)
  })
});

/* POST */
router.post('/', function(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send();
  } else {
    Users.create({
      username: req.body.username,
      email: req.body.email,
      birth_date: req.body.birth_date,
      group_id: req.body.group_id
    }).then(function (user) {
      res.send(user)
    })
  }
});

router.delete('/:id', function (req, res, next) {
  Users.destroy({
    where: {
      id: req.params.id
    },
    paranoid: true
  }).then(function (user) {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  })
})

module.exports = router;
