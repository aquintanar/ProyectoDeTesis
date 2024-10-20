import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";



export async function GET(
    req:Request,
    {params}:{params:{provinciaId:string}}
){
    try{
        

        


        const province = await prisma.province.findUnique({
            where:{
                id:params.provinciaId,
            }
        })
        
        return NextResponse.json(province);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}



export async function PATCH(
    req:Request,
    {params}:{params:{provinciaId:string}}
){
    try{
        const body = await req.json();

        const {    name,
            economicactivity,
            surface,
            population,
            description,
            imageUrl,
            country
        } = body;

        if(!name || !imageUrl){
            return new NextResponse("Missing fields",{status:400});
        }

        const province = await prisma.province.updateMany({
            where:{
                id:params.provinciaId,
                
            },
            data:{
                economicactivity,
                surface,
                population,
                description,
                imageUrl,
                country_id:country.id,
            }
        })
        
        return NextResponse.json(province);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}





export async function DELETE(
    req:Request,
    { params }: { params: { provinciaId: string } }
){
    try{
        console.log(params)

        if (!params.provinciaId) {
            return new NextResponse("Province ID is required", { status: 401 });
        }
        const province = await prisma.province.delete({
            where:{
                id:params.provinciaId,
            }
        })
        
        return NextResponse.json(province);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}