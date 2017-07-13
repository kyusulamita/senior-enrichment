'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull : false
  },
  email: {
    type: Sequelize.STRING,
    validate : {
      isEmail : true
    }
  },
  image: Sequelize.STRING
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('campus'),
        as: 'school'
      }]
    })
  }
})
