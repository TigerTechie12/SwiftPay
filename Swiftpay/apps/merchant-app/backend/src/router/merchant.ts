import {Router} from 'express'

export const merchantRouter=Router()

merchantRouter.post('/signup',(req,res)=>{
const {username,password,name}=req.body
})

merchantRouter.post('/signin',(req,res)=>{
const {username,password}=req.body
})