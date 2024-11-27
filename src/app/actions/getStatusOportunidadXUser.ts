import prisma from'@/app/libs/prismadb';
import { SafeUser } from '../types';
import { Opportunity } from '@prisma/client';



export default async function getStatusOportunidadXUser(
    oportunidad:Opportunity,
    currentUser:SafeUser
) {
  try{
   
    
    const status = await prisma.userxOpportunity.findMany({
        where:{
            opportunityId:oportunidad.id,
            userId:currentUser.id,
        }
    });
    

    return status;
  }  catch(error:any){
    console.log(error);
    return null;
  }
}