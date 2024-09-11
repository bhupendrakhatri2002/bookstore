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
  try {
    // Check if a file was uploaded
    const imageFilename = req.file ? req.file.filename : null;

    // Create a new book entry with or without an image
    const bookdata = new books({
      ...req.body,
      image: imageFilename
    });

    // Save the book data to the database
    await bookdata.save();

    // Redirect to the library page or any other page
    res.redirect('/library');
  } catch (error) {
    // Handle errors (e.g., database errors, validation errors)
    next(error);
  }
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
  try {
    // Find and delete the book by ID
    const data = await books.findByIdAndDelete(req.params.id);

    // Check if the book was found and has an associated image
    if (data && data.image) {
      // Construct the file path
      const filePath = path.join(__dirname, '..', 'public', 'images', data.image);

      // Check if the file exists before attempting to delete it
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    }

    // Redirect to the library page
    res.redirect('/library');
  } catch (error) {
    // Handle any errors that occurred during the delete operation
    next(error);
  }
})


router.get("/about",function(req,res,next){
  res.render("about")
})

module.exports = router;
