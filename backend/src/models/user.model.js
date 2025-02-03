import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },
  projects: [{
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save',async function(next){
  if(!this.isModified("password")) return next();
  this.password=await bcrypt.hash(this.password,10)
  next()
})


userSchema.methods.isPasswordCorrect=async function(password){
 return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAcessToken=function(){
  return jwt.sign(
      {
          _id:this._id,
          email:this.email,
          username:this.username,
          fullname:this.fullname
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

userSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
      {
          _id:this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}


export const User=mongoose.model('User',userSchema)
