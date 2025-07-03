import {Router} from 'express'
import zod from 'zod'
import { PrismaClient} from '@prisma/client'
import {JWT_MERCHANT_PASS} from "../config"
import jwt from 'jsonwebtoken'
export const merchantRouter=Router()

const prismaClient=new PrismaClient()

merchantRouter.post('/signup',async(req,res)=>{
const {username,password,name}=req.body
const schema=zod.object({
    username:zod.string(),
    password:zod.string().min(8),
    name:zod.string()
})
try{
    const result=schema.safeParse(req.body)
if(!result.success){
res.json({message:"something went wrong"})
}
else{
   const dbData=await prismaClient.merchant.create({
    data:{
        username,
        password,
        name
    }
})

}}
catch(e){
    console.error(e)
res.status(403).json({message:"Something went wrong"})
}})

merchantRouter.post('/signin',async(req:any,res:any)=>{
const {username,password}=req.body
const schema=zod.object({
username:zod.string(),
password:zod.string().min(8)
})
const result=schema.safeParse(req.body)
try{
if(!result.success){
res.json({message:"Wrong inputs"})
}
else{
const find=await prismaClient.merchant.findFirst({
where:{
    username,password
}
})
if(!find){
    return res.json({message:"User hasn't signed up"})
}
}
const token=jwt.sign({
    id:merchant.id
},JWT_MERCHANT_PASS)
return res.json({token})
}
catch(e){
    res.status(403).json({message:"something went wrong"})
}


})