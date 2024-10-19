import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";


export async function POST(
    req:Request,
    
){
    try{

        
        const body = await req.json();
        
        const {
            
            type,
            area_of_ability,
            description,
            name,
            imageUrl
            } = body;

        

        const ability = await prisma.ability.create({
            data:{
                
                type,
                area_of_ability,
                description,
                name,
                imageUrl
            }
        })
        
        return NextResponse.json(ability);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export async function GET(
   
    
){
    try{
       
        const ability = await prisma.ability.findMany   ({

        })
        

        
        return NextResponse.json(ability);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}