import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";



export async function GET(
    req:Request,
    {params}:{params:{proyectoId:string}}
){
    try{
        

        


        const proyect = await prisma.proyect.findUnique({
            where:{
                id:params.proyectoId,
            }
        })
        
        return NextResponse.json(proyect);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}



export async function PATCH(
    req:Request,
    {params}:{params:{proyectoId:string}}
){
    try{
        const body = await req.json();

        const { ods,
            description,
            name,
            imageUrl,} = body;

        if(!name ){
            return new NextResponse("Missing fields",{status:400});
        }

        const proyect = await prisma.proyect.updateMany({
            where:{
                id:params.proyectoId,
                
            },
            data:{
                ods,
                description,
                name,
                imageUrl,
            }
        })
        
        return NextResponse.json(proyect);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}





export async function DELETE(
    req:Request,
    {params}:{params:{proyectoId:string}}
){
    try{
        

        


        const proyect = await prisma.proyect.deleteMany({
            where:{
                id:params.proyectoId,
            }
        })
        
        return NextResponse.json(proyect);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}