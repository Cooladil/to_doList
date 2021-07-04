const mongoose = require("mongoose");
const toDoSchema  = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("AllTasks", toDoSchema);


// const anotherSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         require: true
//     }
// });