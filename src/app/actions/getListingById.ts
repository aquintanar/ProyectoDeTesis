import prisma from'@/app/libs/prismadb';


interface IParams{
    listingId?: string;
}

export default async function getListingById(
    params:IParams
) {
  try{
    console.log('ESTOY DENTRO')
    const {listingId} = params
    const listing = await prisma.listing.findUnique({
        where:{
            id:listingId
        }
    });
    
    if(!listing){
        return null;
    }
    return {
        ...listing,
        createdAt : listing.createdAt.toISOString(),
       
    };
  }  catch(error:any){
    console.log(error);
    return null;
  }
}