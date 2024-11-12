import prisma from "@/app/libs/prismadb"
import { ca } from "date-fns/locale";

interface IParams{
    listingId?:string,
    userId?:string,
}


export default async function getAplicaciones(
    params:IParams
) {

    try{
        const {listingId,userId} = params;

        const query:any={}

        if(listingId){
            query.listingId = listingId;
        }
        if(userId){
            query.userId = userId;
        }

        const aplicaciones = await prisma.userxOpportunity.findMany({
            where:query,
            include:{
                opportunity:true,
                user:true,
            }
        })

        
        return aplicaciones;
    }catch(error:any){
        throw new Error(error);
    }
}