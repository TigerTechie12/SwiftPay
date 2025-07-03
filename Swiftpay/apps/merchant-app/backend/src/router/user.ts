import {Router} from 'express'

export const userRouter=Router()

userRouter.post('/signup',(req,res)=>{
const {username,password,name}=req.body

})

userRouter.post('/signin',(req,res)=>{
    const {username,password}=req.body
    
})