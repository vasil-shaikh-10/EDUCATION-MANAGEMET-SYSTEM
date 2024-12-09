const Course = require("../../models/EducationSchema/course.model");

const CreateCourse = async(req,res)=>{
    try {
        let {name,description,teacherId,syllabus,students,schedule} = req.body;
        if (!name || !description || !teacherId || !syllabus || !students || !schedule){
            res.status(400).json({message:'All Fields Required.'})
        }
        if(req.user.role == 'Admin'){
            let Obj = new Course({
                name,description,teacherId,syllabus,students,schedule
            })
            await Obj.save()
            res.status(201).json({success:true,create:{
            ...Obj._doc,
            }})
        }else{
            res.status(400).json({success:false,message:"Unauthorized"})
        }

        
    } catch (error) { 
        console.log('Error In CreateCourse From Admin Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}

const UpdateCourse = async(req,res)=>{
    let {id} = req.params
    let {name,description,teacherId,syllabus,students,schedule} = req.body;

    try {
        let ExtisCourse = await Course.findById(id)
        if(!ExtisCourse){
            return res.status(404).json({message:"Opps ! No Data Found."})
        }

        if(req.user.role == 'Admin'){
            let Data = await Course.findByIdAndUpdate(id,{name,description,teacherId,syllabus,students,schedule},{new:true,runValidators:true})
            res.status(201).json({success:true,data:Data})
        }else{
            res.status(400).json({success:false,message:"Unauthorized"})
        }

    } catch (error) {
        console.log('Error In UpdateCourse From Admin Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}

const DeleteCourse = async(req,res)=>{
    let {id} = req.params
    try {
        let ExtisCourse = await Course.findById(id)
        if(!ExtisCourse){
            return res.status(404).json({message:"Opps ! No Data Found."})
        }

        if(req.user.role == 'Admin'){
            let Data = await Course.findByIdAndDelete(id)
            res.status(201).json({success:true,message:'Delete Successfully...',data:Data})
        }else{
            res.status(400).json({success:false,message:"Unauthorized"})
        }

    } catch (error) {
        console.log('Error In UpdateCourse From Admin Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}

const DeleteEnroll =async(req,res)=>{
    try {
        // let {id} = req.params
        let {userid,courseid} = req.body
        let data = await Course.findById(courseid)
        data.students.map(async(ele,index)=>{
            if (ele == userid){
                data.students.pop(index)
                await data.save()
                res.status(201).json({success:true,message:'Student Remove Successfully...'})
            }else{
                console.log("not")
            }
        })
        // console.log(data.students)
    } catch (error) {
        console.log('Error In DeleteEnroll From Admin Controller :- ',error.message)
        res.status(500).json({message:"Internal Error.",error:error})
    }
}

module.exports = {CreateCourse,UpdateCourse,DeleteCourse,DeleteEnroll}