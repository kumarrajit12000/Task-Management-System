const express = require("express");
const app = express();
const mysql = require("mysql2");
const mongoose = require("mongoose")
const cors = require('cors');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const user = require("./models/user.js");
 app.use(cors({
    origin : ["http://localhost:5173"],
    methods : ["POST","GET"],
    credentials : true,
 })); 
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


// Mongoose connection
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/TMS");
}

main().then(()=> console.log("connect sussefullly..."))
    .catch((err) => console.log(err));

//mysql connection
// const db = mysql.createConnection({
//         host : "localhost",
//         user : "root",
//         database : "users",
//         password : "root",
// });

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if(token){
        jwt.verify(token,"secretKey", (err,decoded) => {
            if(err){
                res.json({status : "Authentication Error.."})
            }
                req.name = decoded.name;
                next()
            
        })
    }else{
        res.json({status : "Unauthorized"})
    }
} 

app.get("/",verifyUser,(req,res) => {
   
    res.json({status : "Authorized"})
})

app.post("/register",(req,res) => {

    const {name,email,pass} = req.body.user;

    bcrypt.hash(pass,salt, (err,hashPass) => {
            if(err) return res.json({Error : "err in hashing"});

        const result = user.find({email:email});
        
        console.log(result);

              if(result.length){
                  return res.json({status : "emailAlreadyExist"});
              }
              else{
                user.insertMany([{ name : name ,email : email , password : hashPass}]);
                 return res.json({status : "success"});
              }
    })
    
})
app.post("/login",(req,res) => {
    const {email,password} = req.body.user;
    let q = `SELECT * FROM REGISTER WHERE EMAIL = "${email}"`;

    db.query(q, async(err,result) => {
        if(err) return res.json({Error : "ERROR IN LOGIN"});
        console.log(result);
        if(result.length > 0){

             bcrypt.compare(password,result[0].pass, (err,response) => {
                if(err) return res.json({Error : "password compare errror"});

                if(response){
                    const name = result[0].name;
                    const token = jwt.sign({name},"secretKey", {expiresIn: "30s"});
                    res.cookie("token",token, { httpOnly : true , maxAge : 360000});
                    return res.json({status : "success"});
                }
                 else{
                    return res.json({status : "wrongPassword"});
                }
             })   
        }
        else{
             return res.json({status : "noAccountFetch"});  
            }
    })
    
})


app.get("/logout", (req,res) => {
    res.clearCookie("token");
    return res.json({Status : "Success"});
})

app.listen("8080",() => {
 console.log("server is listning on port 8080");
});
