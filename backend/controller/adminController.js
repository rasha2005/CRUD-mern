const bcrypt = require('bcrypt');
const Admin = require('../model/adminModel');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const adminLogin = async(req ,res) => {
    try {
        const {email , password} = req.body;
        console.log("email",email ,"password" , password);

        const admin = await Admin.findOne({email : email});
        
        if(admin) {
            const admin_id = admin._id;
            const passwordHash = await bcrypt.compare(password , admin.password);
            if(passwordHash) {
                const token = jwt.sign({admin_id} , process.env.JWTSECRET , {
                    expiresIn: 3 * 24 * 60 * 60
                })
                return res 
                .status(200)
                .json({success:true , message:"logged in successfully" ,token , admin_id});
            }else{
                return res
                .status(200)
                .json({success:false , message:"invalid credential"})
                
            }
        }else {
            return res
            .status(200)
            .json({success:false , message:"invalid credential"})
        }
    }catch (error) {
        console.log(error);
    }
}

const insertAdmin = async(req,res) => {
    try {
        const {email , password} = req.body;

        
            const hashedPassword = await bcrypt.hash(password , 10);
            console.log("hashedPassword" , hashedPassword)

            const admin = Admin ({
                email:email,
                password:hashedPassword
            })
        
            await admin.save();

            if(admin) {

            
        return res
        .status(200)
        .json({success : true , message : "got th user"})
            }
        
    }catch (error) {
        console.log(error);
    }
}

const getUserList = async(req,res) => {
    try {
        console.log("kkkk");

        const user = await User.find();
        if(user) {
            return res
            .status(200)
            .json({success:true , messgae:"succefully found the users" , user})
        }else{
            return res
            .status(401)
            .json({success:true , message:"users data not found"})
        }

    }catch (error) {
        cosnole.log(error)
    }
}

const deleteUser = async(req,res) => {
    try{
       const {userId} = req.params;

       if(userId) {
           const user = await User.findOneAndDelete({_id : userId});
           return res
           .status(200)
           .json({success:true , message:"user deleted successfully"});
       }else{
            return res
            .status(400)
            .json({success:false , message:"something went wrong"});
       }


    }catch(err) {
        console.log(err);
    }
}

const editUser = async(req,res) => {
    try{
        const {userId} = req.params;
        const { name , mobile} = req.body;

        const user = await User.findByIdAndUpdate(userId ,{
            name,
            mobile
        })

        if(user) {
            return res
            .status(200)
            .json({success : true , messgae : "user updated successfully"});
        }else{
            return res
            .status(400)
            .json({success:false , message:"something went wrong"});
        }

    }catch(error) {
        console.log(error);
    }
}

module.exports = {
    adminLogin,
    insertAdmin,
    getUserList,
    deleteUser,
    editUser
}