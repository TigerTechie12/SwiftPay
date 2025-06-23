import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
const prisma=new PrismaClient()

async function main(){
  const alice=await prisma.user.upsert({
    where:{number:'11111'},
    update:{},
    create:{
      number:'11111',
      password:await bcrypt.hash('alice',10),
      name:'alice',
      email:'alice@example.com',
      Balance:{
        create:[{amount:2000,
          locked:0
        }]
      },
      OnRampTransaction:{
        create:{
          startTime:new Date(),
          status:'Success',
          amount:20000,
          token:'token_1',
          provider:"HDFC BANK",

        },
      },

    },
  })
}
console.log("loaded db url:",process.env.DATABASE_URL)