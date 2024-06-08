const mongoose =require("mongoose")


const bookschema = new mongoose.Schema({
    image:String,
    bookname:String,
    author:String,
    category:String,
    language:String,
    price:String,
    description:String
})

const book = mongoose.model("book",bookschema)
module.exports =book