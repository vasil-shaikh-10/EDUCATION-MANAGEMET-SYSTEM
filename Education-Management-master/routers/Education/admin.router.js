const {Router} = require('express')
const {CreateCourse, UpdateCourse, DeleteCourse, DeleteEnroll} = require('../../controllers/Education/admin.controller')

const AdminRouter = Router()

AdminRouter.post('/create/course',CreateCourse)
AdminRouter.patch('/update/course/:id',UpdateCourse)
AdminRouter.delete('/delete/course/:id',DeleteCourse)
AdminRouter.delete('/enroll/remove',DeleteEnroll)

module.exports = AdminRouter