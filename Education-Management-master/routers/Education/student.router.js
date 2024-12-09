const {Router} = require('express')
const { StudentEnroll, AssignmenSubbmison } = require('../../controllers/Education/student.controller')

const StudentRouter = Router()

StudentRouter.post('/enroll/course',StudentEnroll)
StudentRouter.post('/add/assignment',AssignmenSubbmison)

module.exports = StudentRouter