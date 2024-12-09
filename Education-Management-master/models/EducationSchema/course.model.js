const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },                  // Course name
    description: { type: String },                           // Course description
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the teacher
    syllteacherIdabus: { type: String },                              // Link or content for the syllabus
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // List of enrolled students
    schedule: {
      days: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
      time: { start: String, end: String }, // e.g., { start: "10:00 AM", end: "11:00 AM" }
    },
    createdAt: { type: Date, default: Date.now },            // Timestamp for creation
    updatedAt: { type: Date, default: Date.now },
})

const Course = mongoose.model('Course',CourseSchema)

module.exports = Course