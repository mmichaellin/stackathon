const router = require('express').Router()
// const { Campus, Student } = require('../db')
const Student = require('../db/Student')

router.get('/', async (req, res, next) => {
  try {
    const allStudent = await Student.findAll()
    res.send(allStudent)
  } catch (err) {
    next(err)
  }
})

router.get('/:studentName', async (req, res, next) => {
  try {
    const output = await Student.findAll({
      where: { name: req.params.studentName }
    })
    let test = await Student.findAll()
    res.send(output)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body)
    res.send(newStudent)
  } catch (err) {
    console.log(err)
  }
})

router.put('/:name', async (req, res, next) => {
  try {
    const updated = await Student.update(req.body, {
      where: { name: req.params.name }
    })
    res.send(updated)
  } catch (err) {
    console.log(err)
  }
})

router.put('/:name/:newLocation', async (req, res, next) => {
  try {
    const updated = await Student.update({ theCampus: req.params.newLocation }, {
      where: { name: req.params.name }
    })
    const updatedInstance = await Student.findOne({
      where: { name: req.params.name }
    })
    res.send(updatedInstance)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:name', async (req, res, next) => {
  try {
    await Student.destroy({
      where: { name: req.params.name }
    })
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
