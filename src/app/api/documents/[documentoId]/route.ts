import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";



export async function GET(
    req:Request,
    {params}:{params:{documentoId:string}}
){
    try{
        

        


        const document = await prisma.document.findUnique({
            where:{
                id:params.documentoId,
            }
        })
        
        return NextResponse.json(document);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}



export async function PATCH(
    req:Request,
    {params}:{params:{documentoId:string}}
){
    try{
        const body = await req.json();

        const {name,
            type ,
            description ,
            imageUrl } = body;

        if(!name){
            return new NextResponse("Missing fields",{status:400});
        }

        const document = await prisma.document.updateMany({
            where:{
                id:params.documentoId,
                
            },
            data:{
                name,
            type ,
            description ,
            imageUrl 
            }
        })
        
        return NextResponse.json(document);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}





export async function DELETE(
    req:Request,
    {params}:{params:{documentoId:string}}
){
    try{
        

        


        const document = await prisma.document.deleteMany({
            where:{
                id:params.documentoId,
            }
        })
        
        return NextResponse.json(document);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}