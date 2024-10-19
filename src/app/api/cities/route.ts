import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";


export async function POST(
    req:Request,
    
){
    try{

        
        const body = await req.json();
        
        const {
            
            name,
            description,
            imageUrl,
            province,
            } = body;

        

        const city = await prisma.city.create({
            data:{
                
                name,
                description,
                imageUrl,
                province,
            }
        })
        
        return NextResponse.json(city);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export async function GET(
   
    
){
    try{
       
        const city = await prisma.city.findMany   ({

        })
        

        
        return NextResponse.json(city);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}