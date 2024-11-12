import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    
){
    try{
        const body = await req.json();
        
        const {
            
            idUser,
            countriesId,
          } = body;

        const userXcountry = await prisma.userxCountry.create({
            data:{
                userId:idUser,
                countryId:countriesId,
              
            }
        })
        
        return NextResponse.json(userXcountry);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}