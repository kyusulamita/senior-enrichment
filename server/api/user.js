'use strict'
const api = require('express').Router()
const db = require('../../db')
const {User, Campus} = require('../../db/models')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'students'}))

api.param('id', function (req, res, next, id) {
  User.findById(id)
  .then(function (student) {
    if (!student) throw HttpError(404); //no student with that id found
    req.student = student; // attatch story to request body
    next(); // avoid black hole
    return null;
  })
  .catch(next); //catch errors
});

api.get('/', function (req, res, next) {
  User.findAll({})
  .then(function (users) {
    res.json(users);
  })
  .catch(next);
});

api.post('/', function (req, res, next) {
  User.create(req.body)
  .then(function (student) {
    return student.reload(User.options.scopes.populated())
  })
  .then(function(studentIncludingSchool) {
    res.json(studentIncludingSchool)
  })
  .catch(next);
});

api.get('/:id', function (req, res, next) {
  req.student.reload(User.options.scopes.populated())
  .then(function (studentIncludingSchool) {
    res.json(studentIncludingSchool);
  })
  .catch(next);
});

api.put('/:id', function (req, res, next) {
  req.student.update(req.body)
  .then(function (student) {
    return student.reload(User.options.scopes.populated());
  })
  .then(function (studentIncludingSchool) {
    res.json(studentIncludingSchool);
  })
  .catch(next);
});

api.delete('/:id', function (req, res, next) {
  req.student.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});


module.exports = api
