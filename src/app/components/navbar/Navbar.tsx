'use client'

import Container from "../Container";
import Logo from "./Logo"
import Search from "./Search";
import UserMenu from "./UserMenu";
import Avatar from "../Avatar";

import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";

export const categories = [
    {
        label:'Tecnologia',
        icon: TbBeach,
        description:'This property is close to the beach!'
    },
    {
        label:'Marketing',
        icon: GiWindmill,
        description:'This property has windmills!'
    },
    {
        label:'Finanzas',
        icon: MdOutlineVilla,
        description:'This property is modern!'
    },
    {
        label:'Negocios',
        icon: TbMountain,
        description:'This property is modern!'
    }
    ,
    {
        label:'Educacion',
        icon: TbPool,
        description:'This property is modern!'
    }
    ,
    {
        label:'Salud',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Igualdad',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Ambiental',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Idiomas',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Numeros',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Arte',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Deporte',
        icon: GiIsland,
        description:'This property is modern!'
    }
    

]

interface NavbarProps{
    currentUser?:SafeUser  | null;

}

const Navbar : React.FC<NavbarProps> = ({
    currentUser
})=>{
    return(
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div
                className="
                py-4
                border-b-[1px]
                "
            >
                <Container>
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-3
                            md:gap-0
                        
                        
                        "
                    >
                        <Logo/>
                        <Search/>
                        <UserMenu currentUser = { currentUser}/>
                    </div>

                </Container>
                
            </div>
            <Categories/>
        </div>
    )
}


export default Navbar;