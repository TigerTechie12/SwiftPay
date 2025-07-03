import express from 'express'
import {userRouter} from './router/user'
import {merchantRouter} from './router/merchant'
const app=express()

app.post("/api/v1/user",userRouter)
app.post("/api/v1/merchant",merchantRouter)
