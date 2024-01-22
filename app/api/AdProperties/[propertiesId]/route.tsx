import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'
import { SafeListing } from "@/app/types";

interface IParams {
    propertiesId : string ;
}


export async function DELETE (
    request : Request,
    {params } : {params : IParams}
){
    

    const {propertiesId} = params

    if(! propertiesId || typeof  propertiesId !== 'string'){
        throw new Error('invalid Id')
    }

    const listing = await prisma.listing.deleteMany({
        where : {
            id :  propertiesId 
            
        }
    })

    return NextResponse.json(listing);
}
