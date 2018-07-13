const router = require('express').Router()
// const { Campus, Student } = require('../db')
const Campus = require('../db/Campus')
const Student = require('../db/Student')

router.get('/', async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll()
    res.send(allCampuses)
  } catch (err) {
    next(err)
  }
})

router.get('/:location', async (req, res, next) => {
  const output = await Campus.findAll({
    where: { location: req.params.location }
  })
  res.send(output)
})

router.get('/:location/students', async (req, res, next) => {
  const output = await Student.findAll({
    where: { theCampus: req.params.location }
  })
  res.send(output)
})

router.post('/', async (req, res, next) => {
  const newCampus = await Campus.create(req.body)
  res.send(newCampus)
})

router.put('/:location', async (req, res, next) => {
  try {
    const updated = await Campus.update(req.body, {
      where: {location: req.params.location}
    })
    res.send(updated)
  } catch (err) {
    console.log(err)
  }

})

router.delete('/:location', async (req, res, next) => {
  await Campus.destroy({
    where: { location: req.params.location }
  })
  res.sendStatus(204)
})

module.exports = router
