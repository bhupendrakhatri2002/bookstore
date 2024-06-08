const mongoose =require("mongoose");

mongoose.connect("mongodb://0.0.0.0/bookstore")
.then(()=>console.log("data base connected"))
.catch((err)=>console.log(err))