import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    
){
    try{

        
        const body = await req.json();
        
        const {
            
            name,
            economicactivity,
            surface,
            population,
            description,
            imageUrl,
            country,
            } = body;

        

        const province = await prisma.province.create({
            data:{
                
                name,
            economicactivity,
            surface,
            population,
            description,
            imageUrl,
            country,
            }
        })
        
        return NextResponse.json(province);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export async function GET(
   
    
){
    try{
       
        const province = await prisma.province.findMany   ({

        })
        

        
        return NextResponse.json(province);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}