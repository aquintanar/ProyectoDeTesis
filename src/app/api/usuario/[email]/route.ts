import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params}:{params:{email:string}}
){
    try{
        
        const usuario = await prisma.user.findUnique({
            where:{
                email:params.email,
            }
        })
        
        return NextResponse.json(usuario);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


