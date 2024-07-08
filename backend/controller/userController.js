const User = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');




const securePassword = async(password) => {
    try {

        if(password){
            const hashedPassword = await bcrypt.hash(password , 10);
            console.log("hashed" , hashedPassword)
            return hashedPassword;
        }
    }catch (err) {
        console.log(err)
    }
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({id} , 'expectoopetronus' , {
        expiresIn:maxAge
    })
}



const insertUser = async(req,res) => {
    try {
        console.log("hiii its here")
        console.log(req.body)
        const {name , email , password , file , mobile } = req.body
       
        const existingEmail = await User.findOne({email:email});
        if(existingEmail) {
            console.log("hereeeeee")
            return res
            .status(404)
            .json({ success:false , message:"email already exists"})
        }
 
        let spassword = await securePassword(password);

        console.log("spassword" , spassword);
       

        const user = User({
            name:name,
            email:email,
            mobile:mobile,
            image:file,
            password:spassword
        })
       await user.save();

        const token = createToken(user._id)

       if(user){
        return res
        .status(201)
        .json({sucess:true , token, message:"user created successfully", user_id:user._id})
       }

    } catch (err) {
        console.log(err);
    }
}

const getUser = async(req,res) => {
    try{
        console.log("heee",req.params)
        const { userId } = req.params;
        console.log("smkdk",userId)
     
        const user = await User.findOne({_id : userId});

        if(user) {
            return res
            .status(201)
            .json({success:true , user})
        }else{
            return res
            .status(400)
            .json({success:false , message:"user data not found"});
        }

        
    }catch (err) {

    }
}

const updateUser = async(req , res) => {
    try {
        const {userId} = req.params;
        const {name , email , file , password , mobile} = req.body;
        console.log("name" , name);
        const u = await User.findOne({_id : userId})
        const existingEmail = await User.findOne({email : email});
        if(existingEmail) {
            console.log("heyy")
            return res
            .status(401)
            .json({success:false , message: "email already exits"});
        }
        const pass = async() => {
            if(password) {
                const spassword = await securePassword(password);
                console.log("spassworddd",spassword)
                return spassword;
            }else{
                return u.password;
            }
        }
        

        
        const user = await User.findByIdAndUpdate(userId , {
            name,
            email,
            mobile,
            image:file,
            password: await pass()
        })
        

        if(user) {
            return res
            .status(201)
            .json({success : true , message: "updated successfully"});
        }
       


    }catch (err) {
        console.log(err);
    }
}

const userLogin = async(req,res) => {
    try {
        const {email , password} = req.body;
console.log(email)
        const user = await User.findOne({email:email});
        console.log("user" , user)
        if(user) {
            const passwordHash = await bcrypt.compare(password,user.password);
      console.log(passwordHash)
      if(passwordHash) {
        const token = createToken(user._id);
        return res
        .status(200)
        .json({success : true , message : 'user logged in successfully' , token , userId:user._id})
      }else {
        return res
        .status(200)
        .json({success:false , message:'invalid user'});
      }
        }else {
            return res
            .status(200)
            .json({success:false , message:'invalid user'});
        }

    }catch(err) {
        console.log(err);
    }
}



module.exports = {
    insertUser,
    getUser,
    updateUser,
    userLogin
}