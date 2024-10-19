import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";


export async function POST(
    req:Request,
    
){
    try{

        
        const body = await req.json();
        
        const {
            
            ods,
            description,
            name,
            imageUrl,
            } = body;

        

        const proyect = await prisma.proyect.create({
            data:{
                ods,
            description,
            name,
            imageUrl,
            }
        })
        
        return NextResponse.json(proyect);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export async function GET(
   
    
){
    try{
       
        const proyect = await prisma.proyect.findMany   ({

        })
        

        
        return NextResponse.json(proyect);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}