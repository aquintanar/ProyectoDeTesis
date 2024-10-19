import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";


export async function POST(
    req:Request,
    
){
    try{

        
        const body = await req.json();
        
        const {
            
            name,
            type ,
            description ,
            imageUrl 
            } = body;

        

        const document = await prisma.document.create({
            data:{
                name,
                type,
                description ,
                imageUrl 
            }
        })
        
        return NextResponse.json(document);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export async function GET(
   
    
){
    try{
       
        const document = await prisma.document.findMany   ({

        })
        

        
        return NextResponse.json(document);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}