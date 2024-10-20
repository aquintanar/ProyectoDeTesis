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
import prismadb from '@/app/libs/prismadb';
import { User } from "lucide-react";
import UserCard from "./UserCard";


export default  async function Gestion(){
    const users = await prismadb.user.findMany({
        orderBy:{
            name:'asc'
        }
    });
    
    
    return(
    
    <div className="flex flex-row-revers gap-[48px] px-6">
            
            <div
        className="
            w-full
            mx-auto
            xl:px-20
            md:px-10
            sm:px-2
            px-4
        "
        > 
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
                <div className="
                    pt-4
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                    w-full
                
                ">
                {users.map((user:any)=>{
                    return(
                    <UserCard
                        key={user.id}
                        data={user}
                    />
                    )

                })}
                </div>
                
                
               
            </div>
            
    </div>
    )
}