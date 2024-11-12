import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    
){
    try{
        const body = await req.json();
        
        const {
            
            idUser,
            abilitiesId,
          } = body;

        const userXability = await prisma.userxAbility.create({
            data:{
                userId:idUser,
                abilityId:abilitiesId,
              
            }
        })
        
        return NextResponse.json(userXability);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}