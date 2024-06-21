var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

var filePath = path.join(__dirname, '../init_data.json');
var users = require(filePath).data;
var curId = _.size(users);

/* GET users listing. */
router.get('/', function (req, res) {
  res.json(_.toArray(users));
});

/* Create a new user */
router.post('/', function(req, res) {
  var newUser = req.body;
  var existingUser = _.find(users, { email: newUser.email });
  
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  newUser.id = curId++;
  if (!newUser.state) {
    newUser.state = 'pending';
  }
  users[newUser.id] = newUser;

  fs.writeFile(filePath, JSON.stringify({ data: users }, null, 2), function(err) {
    if (err) {
      log.error('Error writing file', err);
      return res.status(500).json({ error: 'Failed to write data' });
    }
    log.info('Created user', newUser);
    res.json(newUser);
  });
});

/* Get a specific user by id */
router.get('/:id', function (req, res, next) {
  var user = users[req.params.id];
  if (!user) {
    return next();
  }
  res.json(users[req.params.id]);
});

/* Delete a user by id */
router.delete('/:id', function (req, res) {
  var user = users[req.params.id];
  delete users[req.params.id];
  res.status(204);
  log.info('Deleted user', user);
  res.json(user);
});

/* Update a user by id */
router.put('/:id', function (req, res, next) {
  var user = req.body;
  if (user.id != req.params.id) {
    return next(new Error('ID paramter does not match body'));
  }
  users[user.id] = user;
  log.info('Updating user', user);
  res.json(user);
});

/* Handle user state */
router.post('/:id/state', function (req, res, next) {
  var user = users[req.params.id];
  if (!user) {
    return next();
  }
  user.state = req.body.state;
  log.info('Updating user state', user);
  res.json(user);
});

/* Login user by email */
router.post('/login', function (req, res, next) {
  var user = _.find(users, { email: req.body.email });
  if (!user) {
    return next();
  }
  res.json(user);
});


module.exports = router;
