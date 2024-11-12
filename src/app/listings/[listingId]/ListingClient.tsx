'use client'
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "@/app/components/modals/RentModal";
import { categories } from "@/app/components/navbar/Categories";
import Navbar from "@/app/components/navbar/Navbar";
import useLoginModal from "@/app/hooks/useLoginModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import { SafeListings, safeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";





const initialDateRange = {
    startDate: new Date(),
    endDate : new Date(),
    key:'selection'
}


interface ListingClientProps{
    reservation?: safeReservation[];
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
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(()=>{
        let dates: Date[] = [];
        reservation.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates= [...dates,...range];
        });
        return dates;
    },[reservation]);

    const [isLoading,setIsLoading] = useState(false);
    const [totalPrice,setTotalPrice] = useState(listing.price);
    const [dateRange,setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(()=>{
        if(!currentUser){
           
        }
        var data = {
            userId : currentUser?.id,
            opportunityId : listing.id
        }
        console.log(data)
        setIsLoading(true);

        axios.post('/api/userXopportunity',data)
        .then(()=>{
            toast.success('Reservation created');
            
            //Redirect to /trips
            router.refresh();
        })
        .catch((error)=>{
            toast.error('Error creating reservation');
        })
        .finally(()=>{
            setIsLoading(false);
        })
            
    },[totalPrice,dateRange,currentUser,listing.id,currentUser]);

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(dateRange.endDate,dateRange.startDate);

            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price);
            }
            else{
                setTotalPrice(listing.price);
            }

        }
    },[dateRange,listing.price]);


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
                        <div
                            className="
                                order-first
                                mb-10 
                                md:order-last 
                                md:col-span-3     

                            "
                        >
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate = {(value)=>setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled = {isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>

                </div>
            </Container>
        </>
    )
}

export default ListingClient;