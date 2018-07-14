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
  theCampus: {
    type: Sequelize.STRING
  },
  pic: Sequelize.STRING,
  GPA: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 4
    }
  }
})

Student.beforeCreate(student => {
  if (student.pic === '') {
    student.pic = 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg'
  }
})

module.exports = Student
