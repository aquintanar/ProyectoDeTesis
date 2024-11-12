import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import { SafeListings, SafeUser } from "@/app/types";


interface IParams {
    listingId?:string,

}

const ListingPage = async({params}:{params:IParams}) =>{
    const listing = await getListingById(params) as SafeListings & { user: SafeUser };
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();
    console.log(listing)
    
    

    
    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            
            <ListingClient
                listing={listing}
                reservation={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ListingPage