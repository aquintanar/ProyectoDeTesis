import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";



export async function GET(
    req:Request,
    {params}:{params:{paisId:string}}
){
    try{
        

        


        const country = await prisma.country.findUnique({
            where:{
                id:params.paisId,
            }
        })
        
        return NextResponse.json(country);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}



export async function PATCH(
    req:Request,
    {params}:{params:{paisId:string}}
){
    try{
        const body = await req.json();

        const {name,
            religion,
            currency,
            weather,
            language,
            description,
            continent,
            flagUrl} = body;

        if(!name || !flagUrl){
            return new NextResponse("Missing fields",{status:400});
        }

        const country = await prisma.country.updateMany({
            where:{
                id:params.paisId,
                
            },
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





export async function DELETE(
    req:Request,
    {params}:{params:{paisId:string}}
){
    try{
        

        


        const country = await prisma.country.deleteMany({
            where:{
                id:params.paisId,
            }
        })
        
        return NextResponse.json(country);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}