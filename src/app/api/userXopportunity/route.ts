import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    
){
    
    try{
        const body = await req.json();
        
        const {
            
            userId,
            opportunityId,
          } = body;

        const userXopportunity = await prisma.userxOpportunity.create({
            data:{
                userId:userId,
                opportunityId:opportunityId,
                status:"Applied"
              
            }
        })
        
        return NextResponse.json(userXopportunity);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}