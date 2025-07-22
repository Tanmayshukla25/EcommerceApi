import mongoose from "mongoose";
 const UserSchema= new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:Number ,unique:true},
    image:{type:String ,default:""}
 },{timestamps:true})


 const User = mongoose.model("User", UserSchema);
export default User;