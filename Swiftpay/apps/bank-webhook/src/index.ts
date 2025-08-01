import express from 'express'
import db from '@repo/db/client'
import { PrismaClient } from "@prisma/client"
const app=express()

app.post("/hdfcwebhook",async(req,res)=>{
       
    const paymentInformation={
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    }
  try{ await db.$transaction([
    db.balance.update({ 
        where:{
            userId:paymentInformation.userId
        },
        data:{
            amount:{
                increment:Number(paymentInformation.amount)
            }
        }

    }),
     db.onRampTransaction.update({
        where: {token:paymentInformation.token,

        },
        data:{status:"Success"}
        
    })])
    res.status(200).json({message:"captured"})} 
    catch(e){
        console.error(e)
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})