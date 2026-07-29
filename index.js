const { urlencoded } = require("body-parser");
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 8001;

app.use(express.urlencoded({ extended: false }));


// request logging middlewhere = eska matlab hai kh kis client ny konsi request ki hai 
// aur oski detail hai es main yh middle where hai 
app.use((req, res, next)=>{
    console.log('this is middle where 1');
    fs.appendFile("./log.txt", `\n${new Date().toLocaleString()}: ${req.ip} ${req.method} ${req.path}`, (err) => {
    if (err) {
        return res.status(500).json({ message: "Failed to write log file" });
    }

    next();
});
  
})
let users = [];

//get all users
app.get("/api/student", (req, res) => {
  return res.json(users);
});


// get user by name
app.get("/api/student/search", (req, res) => {
  const name = req.query.first_name;

  const result = users.filter(
    (user) => user.first_name.toLowerCase() === name.toLowerCase()
  );

  return res.json(result);
});


// get users by id:
app.get("/api/student/:id", (req, res) => {
  id = Number(req.params.id);
  update = users.find((user) => user.id === id);
  return res.json(users);
});



//update users by id
app.patch("/api/student/:id", (req, res) => {
  id = Number(req.params.id);
  // const body = req.body
  const index = users.findIndex((user) => user.id === id);

  users[index] = {
    ...users[index],
    ...req.body,
  };
  return res.json(users[index]);
});

//post data or create data
app.post("/api/student", (req, res) => {
  const body = req.body;
  // if(!body || !body.first_name || !body.last_name || !body.age  ){
  //   return res.status(400).json({mes:`These field are required`})
  // } 
  users.push({ ...body, id: users.length + 1 });
  return res.json({ status: "success", id: users.length });
});

//delete data by id:
app.delete("/api/student/:id", (req, res) => {
  id = Number(req.params.id);

  updateUsers = users.filter((user) => user.id !== id);
  users = updateUsers;
  return res.json({ status: "success", users });
});

app.listen(PORT, (err) => {
  console.log(`Server Started`);
});

/*
app.get("/api/student",(req, res)=>{
    return res.json(users)


    app.get("/api/student/:id",(req, res)=>{
        id = Number(req.params.id)
        update = users.filter((user) => user.id ===id)
        users = update
    return res.json(users)
    }

    app. post("/api/users",(req, res)=>{
        const body = req.body
        users.push({...body, id:users.length +1})
        return res.json(id:users.length)
        })

        app.delete("/api/users/:id", (req, res)=>{
        id = Number(req.params.id)
            update = users.filter((user)=>user.id ===id)
            return res.json(id)
            })

            app.patch("/api/users", (req, res)=>{
              id = Number(req.params.id)
              const body =    req.body
                 index = users.find((user) => user.id ===id)

                 users[index] = {
                 ...users[index],
                 ...req.body
                 
                 }
                 return res.json(users[index])
                })


                app.put("/api/student/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({ status: "Student not found" });
    }

    users[index] = {
        id: id,
        ...req.body,
    };

    return res.json({
        status: "success",
        student: users[index],
    });
});
*/
