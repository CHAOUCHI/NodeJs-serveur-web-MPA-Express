const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

/**
 * parse http body request to json
 */
app.use(express.json());



/**
 * Middleware that provide options parameter for res.sendFile to next middleware
 */
app.use(function(req,res,next){
    res.options = { 
        root : path.join(__dirname,'website')
    };
    next();
})

/**
 * GET /
 * Home page
 * Permissions : ALL
 */
app.get("/",function(req,res){
    res.status(200).sendFile("index.html",res.options);
})


/**
 * GET /admin
 * Admin page
 * Permissions : admin
 */
app.get("/admin",function(req,res){
    res.status(200).sendFile("admin.html",res.options);
})


/**
 * On any routes send error 404
 */
app.use(function(req,res){
    res.status(404).json({message:"404 : No ressources available.",data:null});
})

/**
 * Start server on localhost:3000
 */
app.listen(3000,function(){
    console.log("Server starts");
});