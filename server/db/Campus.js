const Sequelize = require('sequelize')
const db = require('./database')

const Campus = db.define('campus', {
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: Sequelize.STRING
})

module.exports = Campus
