const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    admissionNumber: { type: String, required: true, unique: true },
                   
    section: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }, 
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    address: { type: String },   
    enrollmentDate: { type: Date, default: Date.now }, 
})

const Student = mongoose.model('Student',StudentSchema)
module.exports = Student