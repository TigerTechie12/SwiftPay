import { PrismaClient } from "@repo/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from  "bcrypt"
import {z} from 'zod'
export const authOptions={
 providers:[
    CredentialsProvider({
        name: 'Credentials',
        credentials:{
            phone:{label:"Phone number",
                 type:"text",
                 placeholder:"982001070928", required:true},
   password:{label:"Password", type:"password", required:true}},
      async authorize(credentials:any):Promise<{id:string; name:string; email?:string} | null>{
       const prisma = new PrismaClient();
        const hashedPassword=await bcrypt.hash(credentials.password,10)
const schema=z.object({
    phone:z.string(),
    password:z.string().min(6)
})
const result=schema.safeParse(credentials)
if(result.success){
  
    const userExist=await prisma.user.findUnique({where:{number:credentials.phone}})

    if(userExist){
        const isPasswordExist=await bcrypt.compare(credentials.password,userExist.password)
        if(isPasswordExist){return {
            id:userExist.id.toString(),
            name:userExist.name || "",
            email:userExist.number
        }}
    }
    return null;
}  
try{
    const user=await prisma.user.create({
        data:{
            number:credentials.phone,
            password:hashedPassword,
            email: `${credentials.phone}@example.com`
        }
    })
    return {
        id:user.id.toString(),
        name:user.name || "",
        email:user.number
    }
}
catch(e:any){console.error(e)}
return null;
}
    })
 ]}

