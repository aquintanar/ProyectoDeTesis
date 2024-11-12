import prisma from '@/app/libs/prismadb'


export default async function getOportunidades (){
    try{
        const oportunidades =  await prisma.opportunity.findMany({
            
        });

        return oportunidades;
    }catch(error:any){
        throw new Error(error);
    }

}