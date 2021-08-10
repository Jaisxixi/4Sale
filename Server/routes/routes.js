const express = require('express');
const User = require('../models/UserSchema');
const Product = require('../models/ProductSchema');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({                   
    destination: (req , res , callback) => {
        callback(null , "../../client/public/uploads/");
    },
    filename: (req , file , callback) => {
        callback(null , file.originalname);
    }
})

const upload = multer({storage: storage}); 

router.get('/' , (req , res) => {
    Product.find()
    .then((items) => res.json(items));
})

<<<<<<< HEAD
router.post('/sell' , (req,res,next) => {
    Product.create(req.body)
    .then((item)=>{
        res.send(item);
    })
    .catch(next);
=======
router.post('/sell' , upload.single("ProductImage") ,(req,res) => {
    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        email: req.body.email,
        price: req.body.price,
        category: req.body.category,
        ProductImage: req.file.originalname
    });

    // 
    router.get('/product/:_id' , (req , res) => {
        Product.findById(_id , (err , docs) => {
            console.log("Successfully Fetched....")
        })
        .then((items => res.json(items)));
    })

    newProduct.save()
    .then((item) => res.json(item));
>>>>>>> 939ba305b4604d1639280a1848896f2f136a1d19
})

// router.delete('/yourpage/:id' , (req , res)) => {

// }

module.exports = router;


