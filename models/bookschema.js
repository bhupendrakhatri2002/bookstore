const mongoose =require("mongoose")


const bookschema = new mongoose.Schema({
    image:{
        type:String,
        default:"https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    },
    bookname:String,
    author:String,
    category:String,
    language:String,
    price:String,
    description:String
})

const book = mongoose.model("book",bookschema)
module.exports =book