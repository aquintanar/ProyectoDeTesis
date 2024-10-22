import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";



export async function GET(
    req:Request,
    {params}:{params:{empresaId:string}}
){
    try{
        

        


        const company = await prisma.company.findUnique({
            where:{
                id:params.empresaId,
            }
        })
        
        return NextResponse.json(company);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}



export async function PATCH(
    req:Request,
    {params}:{params:{empresaId:string}}
){
    try{
        const body = await req.json();

        const {name,
            sector,
            identification_type,
            identification_number,
            type_of_company,
            description,
            imageUrl,
            webSite,} = body;

        if(!name ){
            return new NextResponse("Missing fields",{status:400});
        }

        const company = await prisma.company.updateMany({
            where:{
                id:params.empresaId,
                
            },
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





export async function DELETE(
    req:Request,
    {params}:{params:{empresaId:string}}
){
    try{
        

        


        const company = await prisma.company.deleteMany({
            where:{
                id:params.empresaId,
            }
        })
        
        return NextResponse.json(company);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}