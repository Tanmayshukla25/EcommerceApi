import mongoose from "mongoose";
 const UserSchema= new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:Number},
    image:{type:String ,default:""},

    cart: [
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
  }
]

,  wishlist: [
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  }
]

 },{timestamps:true})


 const User = mongoose.model("User", UserSchema);
export default User;