import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique:true,
    required: true
    
  },
  password: {
    type: String,
    required: true,
    unique:true,
  },
  name: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true,
    unique:true

  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6a5FBvP4u9cMnjSzrrddZ46a2xha3CbH3YstYNetepNcWtHO86Vok5H_EDAy4wbj5Y8w&usqp=CAU'
  },
  coverPicture: {
    type: String,
    default: 'https://th.bing.com/th/id/OIP.Soh-aFCXN0UqOLokQHm4oAHaCv?w=321&h=129&c=7&r=0&o=5&dpr=1.25&pid=1.7'
  },
  about: String,
  livesin: String,
  worksAt: String,
  relationship: String,
  followers: [],
  followings: []
}
  ,
  {
    timestamps: true
  }
)
//Adding Encription to Password
userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password=await bcryptjs.hash(this.password,10);

})
//Adding JWT TOKEN to web
userSchema.methods.getJWTToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_KEY,{
    expiresIn:'5d'

  });
}
//Compare Password
userSchema.methods.comparePassword=async function(enteredPassword){
  return await bcryptjs.compare(enteredPassword,this.password);
}
//Genaratin Password Reset Token
userSchema.methods.getResetPasswordToken=function(){
  //Generating Token
  const resetToken=crypto.randomBytes(20).toString("hex");
  //Hasing and adding resetPasswordToken
  this.resetPasswordToken=crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExpires=Date.now()+15*60*1000;
  return resetToken;

}
const UserModel = mongoose.model('Users', userSchema)
export default UserModel
