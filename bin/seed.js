const {db} = require('../server/db')
const Student = require('../server/db/Student')
const Campus = require('../server/db/Campus')

const seed = async () => {
  await db.sync({force: true})

  const cody = await Student.create({name: 'Cody', theCampus: 'NYC', pic: '', GPA: 4})
  const ted = await Student.create({name: 'Ted', theCampus: 'Chicago', pic: '', GPA: 2})
  const annie = await Student.create({name: 'Annie', theCampus: 'Remote', pic: '', GPA: 3})
  const doug = await Student.create({name: 'Doug', theCampus: 'NYC', pic: '', GPA: 3})
  const julie = await Student.create({name: 'Julie', theCampus: 'Chicago', pic: '', GPA: 4})
  const ann = await Student.create({name: 'Ann', theCampus: 'Remote', pic: '', GPA: 3})
  const brad = await Student.create({name: 'Brad', theCampus: 'NYC', pic: '', GPA: 1})
  const tom = await Student.create({name: 'Tom', theCampus: 'NYC', pic:'', GPA: 3})
  const becca = await Student.create({name: 'Becca', theCampus: 'Chicago', pic: '', GPA: 2})

  await Campus.create({
    location: 'NYC',
    content: 'This campus is the best!',
    imageUrl: 'https://static1.squarespace.com/static/5465987fe4b072133bf2ebd0/5583a6f6e4b0fb931028e0e1/5583a722e4b0fb931028e16a/1434691363307/NYC-logo.jpg?format=1000w'
  })

  await Campus.create({
    location: 'Chicago',
    content: 'This campus is okay',
    imageUrl: 'https://envisionitagency.com/uploads/2017/04/choose-chicago.png'
  })

  await Campus.create({
    location: 'Remote',
    content: 'IDK about this campus',
    imageUrl: 'https://biz.prlog.org/vectir/logo.png'
  })

  db.close()
  console.log(`

  Seeding successful!
  Let's get it!

  `)
}

seed().catch(err => {
  db.close()
  console.log(`

  Error seeding:
  ${err.message}
  ${err.stack}
  `)
})
