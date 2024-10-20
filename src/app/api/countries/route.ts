import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    
){
    try{
        console.log('HOLA')
        
        const body = await req.json();
        
        const {
            
            name,
            religion,
            currency,
            weather,
            region,
            language,
            description,
            continent,
            flagUrl} = body;

        if(!name || !flagUrl){
            return new NextResponse("Missing fields",{status:400});
        }

        const country = await prisma.country.create({
            data:{
                
                name,
                religion,
                currency,
                weather,
                language,
                description,
                continent,
                flagUrl
            }
        })
        
        return NextResponse.json(country);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export async function GET(
   
    
){
    try{
       
        const country = await prisma.country.findMany   ({

        })
        

        
        return NextResponse.json(country);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}