
const Student = require("../model/studentModel")

async function handlegetAllstudent(req, res){
    const allDbStudnets = await Student.find({})
return res.json(allDbStudnets);
}

async function handlegetStudentById(req, res){
  const student = await Student.findById(req.params.id)

 if (!Student) return res.status(404).json({ err: "user not found" });
  return res.json(student);
}

async function handlegetStudnetBySearch(req, res){
   // const result= await Student.find(req.query);
   const result= await Student.find({
       firstName: req.query.firstName,
       
    })
  return res.json(result);
}

async function handleUpdateUserByPatch(req, res){
     await Student.findByIdAndUpdate(req.params.id, req.body)

  return res.json({msg:"suceess updated"});
}

async function hanldeCreteStudent(req, res){
  const body = req.body;
  // this is for we require these paramete. if we require
  if(!body || !body.firstName || !body.lastName || !body.age || !body.studentClass || !body.rollNumber){
    return res.status(400).json({mes:`These field are required`})
  }
//   users.push({ ...body, id: users.length + 1 });
//   return res.json({ status: "success", id: users.length });

const result = await Student.create({
    firstName:body.firstName,
    lastName: body.lastName,
    age: body.age,
    rollNumber:body.rollNumber,
    studentClass:body.studentClass,
})
  console.log('result: ', result);
  
   return res.json({msg:"Success", id:result._id})
}

async function deleteStudentById(req, res){
 await Student.findByIdAndDelete(req.params.id);

  return res.json({ status: "success delete" });
}

async function handleUpdateStudent(req, res){
  const User = await Student.findByIdAndUpdate(req.params.id,req.body)

  return res.json({msg:"suceess updated"});
}
module.exports = {
    handlegetAllstudent,
    handlegetStudentById,
    handlegetStudnetBySearch,
    handleUpdateUserByPatch,
    hanldeCreteStudent,
    deleteStudentById,
    handleUpdateStudent,
}