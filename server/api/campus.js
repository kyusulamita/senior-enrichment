'use strict'
const api = require('express').Router()
const db = require('../../db')

const {User, Campus} = require('../../db/models')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'campus'}))

api.param('id', function (req, res, next, id) {
  Campus.findById(id)
  .then(function (campus) {
    if (!campus) throw HttpError(404); //no campus with that id found
    req.campus = campus; // attatch campus to request body
    next(); // avoid black hole
    return null;
  })
  .catch(next); //catch errors
});

api.get('/', function (req, res, next) {
  Campus.findAll({})
  .then(function (campuses) {
    res.json(campuses);
  })
  .catch(next);
});

api.post('/', function (req, res, next) {
  console.log('api post', req.body)
  Campus.create(req.body)
  .then(function (campus) {
    res.status(201).json(campus);
  })
  .catch(next);
});

api.get('/:id', function (req, res, next) {
  req.campus.reload(Campus.options.scopes.populated())
  .then(function (campusWithStudents) {
    res.json(campusWithStudents);
  })
  .catch(next);
});

api.put('/:id', function (req, res, next) {
  req.campus.update(req.body)
  .then(function (campus) {
    return campus.reload(Campus.options.scopes.populated())
  })
  .then(function (campusWithStudents){
    res.json(campusWithStudents)
  })
  .catch(next);
});

api.delete('/:id', function (req, res, next) {
  req.campus.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = api
