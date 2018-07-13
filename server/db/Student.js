const Sequelize = require('sequelize')
const db = require('./database')

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  theCampus: Sequelize.STRING,
  pic: Sequelize.STRING,
  GPA: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 4
    }
  }
})

module.exports = Student
