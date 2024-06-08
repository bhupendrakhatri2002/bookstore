var express = require('express');
var router = express.Router();


const fs=require("fs")
const path =require("path")
const books =require("../models/bookschema");

const upload =require("../utils/multer").single("image")
// const book =[{
//  image:"https://ew.com/thmb/MaxHBP4uhvg9_3eNeWgx_SOSku0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9781408855669-6cfb2099b6e84a4899ce368d6facc242.jpg",
//   bookname:"harry potter",
//   author:"jos gosling",
//   category:"Comic",
//   language:"English",
//   price:"45/-",
//   description:"this is nice book since 2001" 
// }]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/create",function(req,res,next){
  res.render("create")
})

router.post("/create",upload,async function(req,res,next){
  const bookdata =new books({
    ...req.body,
    image:req.file.filename
    
  })
  await bookdata.save()
  res.redirect("/library")
})

router.get("/library",async function(req,res,next){
  const bookdata =await books.find()
  res.render("library",{
bookdata:bookdata})
})

router.get("/details/:id",async function(req,res,next){
  const bookdata =await books.findById(req.params.id)
  res.render("details",{
    bookdata:bookdata})
})

router.get("/update/:id",async function(req,res,next){
  const currentdata = await books.findById(req.params.id)
   res.render("update",{currentdata:currentdata})
})

router.post("/update/:id",upload,async function(req,res,next){
  const updatedata ={...req.body}
  if(req.file){
    updatedata.image=req.file.filename
    fs.unlinkSync(path.join(__dirname,'..',"public","images",req.body.oldimage))
  }
  await books.findByIdAndUpdate(req.params.id,updatedata)
  res.redirect("/library")
})

router.get("/delete/:id",async function(req,res,next){
  const data =await books.findByIdAndDelete(req.params.id)
  fs.unlinkSync(path.join(__dirname,"..","public","images",data.image))
  
  res.redirect("/library")
})


router.get("/about",function(req,res,next){
  res.render("about")
})

module.exports = router;
