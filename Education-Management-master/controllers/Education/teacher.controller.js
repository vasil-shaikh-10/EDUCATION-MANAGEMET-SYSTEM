const Assignment = require("../../models/EducationSchema/assignment.mode");
const Course = require("../../models/EducationSchema/course.model");
const Grad = require("../../models/EducationSchema/grade.model");

const UpdateTeacher = async(req,res)=>{
    let {id} = req.params;
    let {name,description,syllabus,students,schedule}=req.body;
    try {
        let ExtisCourse = await Course.findById(id)
        if(!ExtisCourse){
            return res.status(404).json({message:"Opps ! No Data Found."})
        }
        if(req.user.role == 'Teacher'){
            if(req.user._id.equals(ExtisCourse.teacherId)){
                let Data = await Course.findByIdAndUpdate(id,{name,description,teacherId:req.user._id,syllabus,students,schedule},{new:true,runValidators:true})
                res.status(201).json({success:true,data:Data})
            }
        }else{
            res.status(400).json({success:false,message:"Unauthorized"})
        }
    } catch (error) {
        console.log('Error In UpdateTeacher From Teacher Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}

const UploadAssignment = async(req,res)=>{
    try {
        let {title,description,courseId,teacherId,studentsAssigned,dueDate} = req.body
        if(req.user.role == 'Teacher'){
            let data = await Assignment.create({title,description,courseId,teacherId:req.user._id,studentsAssigned,dueDate})
            res.status(201).json({success:true,data:data})
        }else{
            res.status(400).json({success:false,message:"Unauthorized"})

        }
    } catch (error) {
        console.log('Error In UploadAssignment From Teacher Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}


const AddGrad = async(req,res)=>{
    try {
        let {grade,courseId,studentId} =req.body
        if(!grade || !courseId || !studentId){
            return res.status(400).json({message:"All Field are required."})
        }


        if(req.user.role == 'Teacher'){
            let Data = new Grad({
                grade,courseId,studentId,teacherId:req.user._id
            })
            await Data.save()
            res.status(201).json({success:true,message:"Gead Add SuccessFully.",data:Data})
        }else{
            res.status(400).json({success:false,message:"Unauthorized"})

        }
    } catch (error) {
        console.log('Error In UploadAssignment From Teacher Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}
module.exports = {UpdateTeacher,UploadAssignment,AddGrad}