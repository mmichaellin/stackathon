const Sequelize = require('sequelize')
const db = require('./database')

const Campus = db.define('campus', {
  location: Sequelize.STRING,
  content: Sequelize.TEXT,
  imageUrl: Sequelize.STRING
})

module.exports = Campus
