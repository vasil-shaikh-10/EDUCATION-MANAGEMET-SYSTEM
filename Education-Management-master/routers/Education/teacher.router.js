const {Router} = require('express')
const {UpdateTeacher, UploadAssignment, AddGrad} = require('../../controllers/Education/teacher.controller')

const TeacherRouter = Router()

TeacherRouter.patch('/update/couser/:id',UpdateTeacher)
TeacherRouter.post('/upload/assignment',UploadAssignment)

TeacherRouter.post('/add/grad',AddGrad)

module.exports = TeacherRouter