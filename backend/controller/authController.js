import User from '../models/user.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import {createToken} from '../auth/auth.js';


const signup=async(req,res)=>{
    const {username, email,password, role}= req.body;
    try{
        const existUser= await User.findOne({email});
        if(existUser){
            return res.json({
                success:false,
                message:"User already exists!"
            });
        }

        //validaation email and password
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter a valid email"
            })
        }

        if(password.length<8){
            return res.json({
                success:false,
                message:"Please enter atleast 8 character"
            })
        }

        //hashed user password
        const salt=await bcrypt.genSalt(10);
        const hassedPassword=await bcrypt.hash(password,salt);

        let userRole = role;
        if (!role || role !== 'admin') {
            userRole = 'user';
        }
        
        const newUser = new User({
            name:username,
            email,
            password: hassedPassword,
            role: userRole
        });

        const savedUser=await newUser.save();
        const token=createToken(savedUser._id);

        res.status(200).json({
            success:true, token, role: savedUser.role
        });

    }catch(err){
        res.status(500).json({
            error:"Failed to save in DB"
        });
    }
}



const login=async(req,res)=>{
    const {email,password}= req.body;
    try{
        const existUser = await User.findOne({email});
        if(!existUser){
            return res.json({
                success:false,
                message:"Invalid Email or Password"
            });
        }

        const isMatched=await bcrypt.compare(password, existUser.password);

        if(!isMatched){
            return res.json({
                success:false,
                message: "Invalid Password. Please enter correct password"
            })
        }

        //if password match
        const token = createToken(existUser._id);
        res.status(200).json({
            success:true,
            token,
             role: existUser.role
        });
    }catch(err){
        res.status(500).json({error:"Failed to Login"});
    }
}

export{
    signup, login
}