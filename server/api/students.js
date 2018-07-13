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
  const output = await Student.findAll({
    where: {name: req.params.studentName}
  })
  let test = await Student.findAll()
  res.send(output)
})

router.post('/', async (req, res, next) => {
  const newStudent = await Student.create(req.body)
  res.send(newStudent)
})

router.put('/:name', async (req, res, next) => {
  console.log('ENTERING THE PUT ROUTEEE')
  const updated = await Student.update(req.body, {
    where: {name: req.params.name}
  })
  res.send(updated)
})

router.delete('/:name', async (req, res, next) => {
  await Student.destroy({
    where: {name: req.params.name}
  })
  res.sendStatus(204)
})

module.exports = router
