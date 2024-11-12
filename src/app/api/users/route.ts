import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
){
    try{
        const body = await req.json();
        const {
            studies,
            fav_program,
            english_level,
            idUser
            } = body;

       

        const User = await prisma?.user.updateMany({
            where:{
                id:idUser
            },
            data:{
                study_area:studies,
                favorite_program:fav_program,
                english_level,
                formFilled:true
            }
        })
        
        return NextResponse.json(User);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}

export async function GET(
    req:Request,
){
    try{
        
        
        const body = await req.json();
        
        const {
            email
            } = body;

        

        const user = await prisma.user.findUnique({
            where:{
                email:email,
            }
        })
        
        return NextResponse.json(user);
    }
    catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500});
    }
}

