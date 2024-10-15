'use client'
import { StickyWrapper } from "@/app/components/Stickywrapper";
import getCurrentUser from "../../actions/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";
import LoginModal from "../../components/modals/LoginModal";
import RegisterModal from "../../components/modals/RegisterModal";
import RentModal from "../../components/modals/RentModal";
import Navbar from "../../components/navbar/Navbar";
import ToasterProvider from "../../providers/ToasterProvider";
import { FeedWrapper } from "@/app/components/Feedwrapper";
import { Header } from "@/app/components/Header";
import Container from "@/app/components/Container";
import getListings from "@/app/actions/getListings";
import ListingCard from "@/app/components/listings/ListingCard";
import AddButton from "@/app/components/AddButton";


export default  function Gestion(){
    
    
    
    return(
    
    <div className="flex flex-row-revers gap-[48px] px-6">
            
            <Container>
                <div className="
                    pt-32
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                
                ">
                

                </div>
                <AddButton
                    label={"Agregar Pais"}
                    href={"/GestionPaises/507f1f77bcf86cd799439011"}
                
                />
               
            </Container>
            
    </div>
    )
}
/*
<StickyWrapper>
                 My sticky sidebar
            </StickyWrapper>
            <FeedWrapper>
                <Header title ="Spanish"/>
            </FeedWrapper>

*/