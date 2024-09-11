const mongoose =require("mongoose");

mongoose.connect("mongodb+srv://bhupinilgar717:bhupendra123@bhupendra.xgc9xwv.mongodb.net/bookstore")
.then(()=>console.log("data base connected"))
.catch((err)=>console.log(err))