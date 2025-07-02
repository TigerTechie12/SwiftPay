'use server'
import { getServerSession } from "next-auth";
import {authOptions} from '../auth'
import db from '@repo/db/client'

export async function createOnRampTransacation(amount:number,provider:string){
    const session=await getServerSession(authOptions)
    const token=Math.random().toString()
    const userNumber=session?.user?.email;
    if(!userNumber){
        return {message:"User not logged in"}
    }
    const user = await db.user.findUnique({ where: { number: userNumber } });
    if (!user) {
        return {message: "User not found"}
    }
    await db.onRampTransaction.create({
        data:{
            userId:user.id,
            amount:amount,
            status:'Processing',
            startTime:new Date(),
            provider,
            token:token     
        }
    })
    return{
        message:"On ramp transaction added"
    }
} 