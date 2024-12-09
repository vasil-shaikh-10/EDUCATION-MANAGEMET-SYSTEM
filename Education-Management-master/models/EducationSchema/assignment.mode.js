const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },                      // Title of the assignment
    description: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Link to the course
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    studentsAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    dueDate: { type: Date, required: true }, 
    submissions: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // Student submitting the assignment
        submissionDate: { type: Date },  
        stutas:{type:Boolean}                                                                        
    }],
})

const Assignment = mongoose.model('Assignment',assignmentSchema)

module.exports = Assignment