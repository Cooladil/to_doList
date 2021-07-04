const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
dotenv.config();
const allTasks = require("./models/allTasks");

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));


// app.post('/',async (req, res) => {
//     const obj = JSON.stringify(req.body);
//     const value = obj["toDo"];
//     const newTask = new AllTasks({
//         content: value
//     });
//     try{
//     // await newTask.save();
//     await console.log(value);
//     res.redirect("/");}
//     catch(err){
//     res.redirect("/");
//     }
// });

// app.post('/', async (req, res) => {
//     const content = JSON.stringify(req.body);
//     console.log(content + " is content.");
//     const obj = JSON.parse(content);
//     console.log(obj + " is obj.");
//     const val = obj.toDo;
//     console.log(val);
//     const todoTask = new AllTasks({
//         content: val
//     });
//     try{
//     await todoTask.save();
//     console.log(todoTask);
//     res.redirect("/");}
//     catch(err){
//     res.redirect("/");
//     }
//     //console.log(content);
//     //console.log(req.body.content)
//     // await addTask.save();
//     //console.log(todoTask);
// });

app.post('/',async (req, res) => {
    const todoTask = new allTasks({
        task: req.body.task
    });
    try {
        await todoTask.save();
        res.redirect("/");
        }
    catch (err) {
        res.redirect("/");
        }
    });

app.route("/edit/:id")
.get((req, res) => {
    const id = req.params.id;
    allTasks.find({}, (err, result) => {
        res.render("frontEdit.ejs", {todoTasks: result, idTask: id});
    });
})
.post((req, res)=>{
    const id = req.params.id;
    allTasks.findByIdAndUpdate(id, {task: req.body.task}, err =>{
        if(err) return res.send(500, err);
        res.redirect("/");
    });
});



app.route("/remove/:id")
// .get((req, res) => {
//     const id = req.params.id;
//     allTasks.find({}, (err, result) => {
//         res.render("frontEdit.ejs", {todoTasks: result, idTask: id});
//     });
// })
.get((req, res)=>{
    const id = req.params.id;
    allTasks.findByIdAndRemove(id, {task: req.body.task}, err =>{
        if(err) return res.send(500, err);
        res.redirect("/");
    });
});

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.secreturl, { useNewUrlParser: true , useUnifiedTopology: true }, (err, res)=>{
    if (err) throw err;
    console.log("Connection established!");
    app.listen(8080, () => console.log('Server is established!!!'));
});

app.set("view engine", "ejs");
app.get('/', (req, res) => {
    allTasks.find({}, (err, tasks)=>{
        if(err) throw err;
        res.render("frontTodo.ejs",{todoTasks: tasks});
    });
    // res.render("frontTodo.ejs");
});
// app.post('/', (req, res)=>{
//     console.log(req.body);
// });