const mongoose = require('mongoose')

const GradSchema = new mongoose.Schema({
    grade: { type: String, required: true }, 
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Grad = mongoose.model('Grad',GradSchema)
module.exports = Grad