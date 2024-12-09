const Assignment = require("../../models/EducationSchema/assignment.mode");
const Course = require("../../models/EducationSchema/course.model")

const StudentEnroll =async(req,res)=>{
    let {CourseId} = req.body;
    try {
        let AllCouser = await Course.find()

        if(req.user.role == 'Student'){
            AllCouser.map(async(ele)=>{
                if(ele._id == CourseId){
                    ele.students.push(req.user._id)
                    await ele.save();
                    res.status(201).json({message:"Student added to course successfully."})
                }else{
                    res.status(404).json({message:"No Data Found."})
                }
            })
        }else{
            res.status(400).json({success:false,message:"Unauthorized"})  
        }

    } catch (error) {
        console.log('Error In StudentEnroll From student Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}

const AssignmenSubbmison = async(req,res)=>{
    try {
        let dataAssignment = await Assignment.find({_id:req.body.id});
        if (!dataAssignment) {
            return res.status(404).json({ message: "data not found." });
        }
        console.log(dataAssignment)
        if(req.user.role == 'Student'){
            dataAssignment[0].submissions.push({
                studentId:req.user._id,submissionDate: Date.now(),stutas:true
            })
            await dataAssignment[0].save()
            res.status(201).json({message:"Student Submision to Assignment successfully."})
        }else{
            res.status(400).json({success:false,message:"Unauthorized"})
        }
    } catch (error) {
        console.log('Error In AssignmenSubbmison From student Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}
module.exports = {StudentEnroll,AssignmenSubbmison}