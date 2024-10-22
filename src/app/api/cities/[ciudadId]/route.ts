import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";



export async function GET(
    req:Request,
    {params}:{params:{ciudadId:string}}
){
    try{
        

        


        const city = await prisma.city.findUnique({
            where:{
                id:params.ciudadId,
            }
        })
        
        return NextResponse.json(city);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}



export async function PATCH(
    req:Request,
    {params}:{params:{ciudadId:string}}
){
    try{
        const body = await req.json();

        const {name,
            description,
            imageUrl,
            province,} = body;

        if(!name ){
            return new NextResponse("Missing fields",{status:400});
        }

        const city = await prisma.city.updateMany({
            where:{
                id:params.ciudadId,
                
            },
            data:{
                name,
                description,
                imageUrl,
                province_id:province.id,
            }
        })
        
        return NextResponse.json(city);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}





export async function DELETE(
    req:Request,
    {params}:{params:{ciudadId:string}}
){
    try{
        

        


        const city = await prisma.city.deleteMany({
            where:{
                id:params.ciudadId,
            }
        })
        
        return NextResponse.json(city);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}