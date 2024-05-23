import User from "@/models/User"
import connect from '@/config/db'
const bcrypt = require('bcryptjs')
import { NextResponse } from 'next/server'


export const POST = async (req: any ) => {
    try{
    const {email, password}  = await req.json()
    await connect()
    const existingUser = await User.findOne({email})

    if(existingUser) {
        return new NextResponse("Email already in use", {status: 400})

    }
    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = new User({
        email, 
        password: hashedPassword
    })

    await newUser.save()
    return new NextResponse("user is registered", {status: 201})

     }catch(err: any){
        console.log(err)
        return new NextResponse(err, {
            status: 500
        })
    }
}