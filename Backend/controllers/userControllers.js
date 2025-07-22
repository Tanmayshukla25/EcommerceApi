import User from "../models/user.js";

export const  registerUser=async(req,res)=>{

  
    try{
        const { name,email,password }=req.body;
        const imageUrl=req.file?req.file.path :"";

        const userExits = await User.findOne({
            email
        })
        if(userExits){
            return res.status(400).json({message:"User already exists"})
        }

        const newUser =new User({
            name,email,password,image:imageUrl,
        });

        await newUser.save()
        res.status(201).json({message:"user register successfully"});

    }
    catch(error){
        console.log("Error",error);
         res.status(500).json({message:"already Exists"});
        
    }
}

export const loginUser = async(req,res)=>{
    
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email,password});
        if(!user){
           return res.status(404).json({message:"User Not Found"});
        }
        if(user.password!==password){
                return res.status(404).json({message:"Invalid User"});
        }

        res.status(201).json({message:"User Login Successfully",user:{
            id:user._id,
            email:user.email,
            password:user.password,
            image:user.image,

        }})
    }

    catch(error){
           res.status(500).json({message:"Server Error"});
    }
}