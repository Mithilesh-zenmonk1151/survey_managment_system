import axios from "axios";
import { NextResponse,NextRequest } from "next/server";
import { NextApiRequest } from "next";
export async function POST(request:NextRequest){
    console.log("helloii")
    try{
        const data= await request.json()
        console.log(data)
        const res  = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/survey`,data)
        console.log(res)
        if(!res) {
                alert("adding test failed")
                return
            }
            return NextResponse.json(res.data)
    }
    catch(error:any){
        console.log(error);
    }
}