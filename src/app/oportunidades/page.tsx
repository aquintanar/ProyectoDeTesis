import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/listings/ListingCard";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import RentModal from "../components/modals/RentModal";
import Categories from "../components/navbar/Categories";
import Navbar from "../components/navbar/Navbar";
import ToasterProvider from "../providers/ToasterProvider";

export default async function Oportunidades(){
    const currentUser = await getCurrentUser();
    const listings  = await getListings();


    const isEmpty= true;


    return(
        <>
        <ClientOnly>
          <ToasterProvider/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          
          <Navbar currentUser = { currentUser}/>
          
          <Container>
                <div className="
                    pt-56
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                
                ">
                {listings.map((listing:any)=>{
                    return(
                    <ListingCard
                        currentUser = {currentUser}
                        key={listing.id}
                        data={listing}
                    
                    />
                    )

                })}
                </div>
            </Container>

            {listings.length ===0 && (

                <EmptyState showReset/>


            )}
          
        </ClientOnly>
        </>
    )
}
