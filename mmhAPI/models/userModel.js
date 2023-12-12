import mongoose from 'mongoose';
const userSchema=({


    firstName:{type:String,trim :true,required:true},
    lastName:{type:String,trim :true,required:true},
    mobile:{type:Number,min:10,required:true},
    password:{type:String,required:true},
    userType:{type:String,required:true}
})

const UserModel=mongoose.model('user',userSchema)


export{UserModel}