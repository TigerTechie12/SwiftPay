import {getServerSession} from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../lib/auth"

export const GET=async()=>{
   try{

    
    const session=await getServerSession(authOptions)
    if(session && session.user){
        return NextResponse.json({
            user:session.user
        })
    }
   }
   catch(e){ return NextResponse.json({
        message:"You arent logged in"
    },
{
    status:403
})} 
    return NextResponse.json({
        message:"You arent logged in"
    },
{
    status:403
})
}