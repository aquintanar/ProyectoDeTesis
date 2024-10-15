import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    
){
    try{
        const body = await req.json();

        const {name,flagUrl} = body;

        if(!name || !flagUrl){
            return new NextResponse("Missing fields",{status:400});
        }

        const country = await prisma.country.create({
            data:{
                name,
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
    req:Request,
    
){
    try{
        const body = await req.json();

        const {name,flagUrl} = body;

        if(!name || !flagUrl){
            return new NextResponse("Missing fields",{status:400});
        }

        const country = await prisma.country.findMany({
            
        })
        
        return NextResponse.json(country);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}