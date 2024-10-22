import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";



export async function GET(
    req:Request,
    {params}:{params:{habilidadId:string}}
){
    try{
        

        


        const ability = await prisma.ability.findUnique({
            where:{
                id:params.habilidadId,
            }
        })
        
        return NextResponse.json(ability);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}



export async function PATCH(
    req:Request,
    {params}:{params:{habilidadId:string}}
){
    try{
        const body = await req.json();

        const {type,
            area_of_ability,
            description,
            name,
            imageUrl} = body;

        if(!name ){
            return new NextResponse("Missing fields",{status:400});
        }

        const ability = await prisma.ability.updateMany({
            where:{
                id:params.habilidadId,
                
            },
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





export async function DELETE(
    req:Request,
    {params}:{params:{habilidadId:string}}
){
    try{
        

        


        const ability = await prisma.ability.deleteMany({
            where:{
                id:params.habilidadId,
            }
        })
        
        return NextResponse.json(ability);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}