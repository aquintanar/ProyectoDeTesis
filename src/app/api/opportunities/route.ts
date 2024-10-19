import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";


export async function POST(
    req:Request,
    
){
    try{

        
        const body = await req.json();
        
        const {
           
            name,
            type_opportunity,
            proyect,
            company,
            city,
            description,
            start_date,
            end_date,
            start_time,
            end_time,
            acivities,
            price,
            payment,
            english_level,
        
            imageUrl,
            
            } = body;

        

        const opportunity = await prisma.opportunity.create({
            data:{
                
                name,
                type_opportunity,
                proyect,
                company,
                city,
                description,
                start_date,
                end_date,
                start_time,
                end_time,
                acivities,
                price,
                payment,
                english_level,
            
                imageUrl,
            }
        })
        
        return NextResponse.json(opportunity);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export async function GET(
   
    
){
    try{
       
        const opportunity = await prisma.opportunity.findMany   ({

        })
        

        
        return NextResponse.json(opportunity);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}