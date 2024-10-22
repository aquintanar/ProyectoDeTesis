import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";



export async function GET(
    req:Request,
    {params}:{params:{usuarioId:string}}
){
    try{
        

        


        const usuario = await prisma.user.findUnique({
            where:{
                id:params.usuarioId,
            }
        })
        
        return NextResponse.json(usuario);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}

