import { NextApiRequest,NextApiResponse } from "next";

import getCurrentUser from "@/app/actions/getCurrentUser";



export default async function handler(req:NextApiRequest,res:NextApiResponse){
    
    try{
        const currentUser = await getCurrentUser()

        return res.status(200).json(currentUser);
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }


}