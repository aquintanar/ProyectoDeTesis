'use client'
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "@/app/components/modals/RentModal";
import { categories } from "@/app/components/navbar/Categories";
import Navbar from "@/app/components/navbar/Navbar";
import ToasterProvider from "@/app/providers/ToasterProvider";
import { SafeListings, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useMemo } from "react";

const initialDateRange = {
    startDate: new Date(),
    endDate : new Date(),
    key:'selection'
}


interface ListingClientProps{
    reservation?: Reservation[];
    listing: SafeListings & {
        user:SafeUser
    }
    currentUser?: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps>  = ({
    listing,
    reservation=[],
    currentUser
}) =>{
    

    const category = useMemo(()=>{
        return categories.find((item)=>{
            item.label===listing.category;
        },[listing.category]);
    },[])
    return(
        <>
            <ToasterProvider/>
            <RentModal/>
            <LoginModal/>
            <RegisterModal/>
          
            <Navbar currentUser = { currentUser}/>
            <Container>
                <div className="max-w-screen-lg mx-auto
                pt-56
                ">
                    <div className="flex flex-col gap-6">
                        <ListingHead
                            title={listing.title}
                            ImageSrc = {listing.ImageSrc}
                            locationValue={listing.locationValue}
                            id={listing.id}
                            currentUser={currentUser}
                        />
                    </div>
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-7
                            md:gap-10
                            mt-6
                        "
                    >
                        <ListingInfo
                            user={listing.user}
                            category = {category}
                            description={listing.description}
                            roomCount = {listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}

                        />
                    </div>

                </div>
            </Container>
        </>
    )
}

export default ListingClient;