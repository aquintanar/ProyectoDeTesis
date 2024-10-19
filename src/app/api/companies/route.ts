import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";


export async function POST(
    req:Request,
    
){
    try{

        
        const body = await req.json();
        
        const {
            name,
            sector,
            identification_type,
            identification_number,
            type_of_company,
            description,
            imageUrl,
            webSite,
            
            } = body;

        

        const company = await prisma.company.create({
            data:{
                
                name,
            sector,
            identification_type,
            identification_number,
            type_of_company,
            description,
            imageUrl,
            webSite,
            }
        })
        
        return NextResponse.json(company);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export async function GET(
   
    
){
    try{
       
        const company = await prisma.company.findMany   ({

        })
        

        
        return NextResponse.json(company);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}