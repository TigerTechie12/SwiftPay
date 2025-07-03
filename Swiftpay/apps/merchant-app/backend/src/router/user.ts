import {Router} from 'express'
import zod from 'zod'
import { PrismaClient} from '@prisma/client'
import {JWT_USER_PASS} from "../config"
import jwt from 'jsonwebtoken'


const prismaClient=new PrismaClient()

export const userRouter=Router()

userRouter.post('/signup',async(req,res)=>{
const {password,email,number,name}=req.body
const schema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(8),
    name:zod.string(),
    number:zod.number()
})
try{
    const result=schema.safeParse(req.body)
if(!result.success){
res.json({message:"something went wrong"})
}
else{
   const dbData=await prismaClient.user.create({
    data:{
        email,
        password,
        name,number
    }
})

}}
catch(e){
    console.error(e)
res.status(403).json({message:"Something went wrong"})
}
})

userRouter.post('/signin',async(req:any,res:any)=>{
    const {email,password}=req.body
const schema=zod.object({
email:zod.string().email(),
password:zod.string().min(8)
})
const result=schema.safeParse(req.body)
try{
if(!result.success){
res.json({message:"Wrong inputs"})
}
else{
const find=await prismaClient.user.findFirst({
where:{
    email,password
}
})
if(!find){
    return res.json({message:"User hasn't signed up"})
}
}
const token=jwt.sign({
    id:user.id
},JWT_USER_PASS)
return res.json({token})
}
catch(e){
    res.status(403).json({message:"something went wrong"})
}

})