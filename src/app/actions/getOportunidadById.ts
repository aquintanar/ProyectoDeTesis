import prisma from'@/app/libs/prismadb';


interface IParams{
    oportunidadId?: string;
}

export default async function getOportunidadById(
    params:IParams
) {
  try{
   
    const {oportunidadId} = params
    const oportunidad = await prisma.opportunity.findUnique({
        where:{
            id:oportunidadId
        }
    });
    
    if(!oportunidad){
        return null;
    }
    return oportunidad;
  }  catch(error:any){
    console.log(error);
    return null;
  }
}