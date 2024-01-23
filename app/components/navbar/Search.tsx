'use client'
import useSearchModalModel from '@/app/hooks/UseSearchModal';
import useCountries from '@/app/hooks/useCountrySelect';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BiSearch} from 'react-icons/bi'
const Search = () => {

    const searchModal = useSearchModalModel() ;
    const params =  useSearchParams() ;
    const {getByValue} = useCountries()
    const locationValue = params ?.get('locationValue')
    const startDate = params ?.get('startaDate')
    const endDate = params ?.get ('endDate')
    const guestCount = params ?.get('guestCount')  

    const locationLabel = useMemo(()=>{
         if(locationValue) {
            return getByValue(locationValue as string) ?.label ;
         }      
         return 'Anywhere' ;

    },[getByValue,locationValue])

    const durationLabel = useMemo(()=>{

        if(startDate && endDate){
            const start = new Date (startDate as string) ;
            const end = new Date (endDate as string) ;
            let diff = differenceInDays(end,start)

            if(diff === 0){
                diff = 1
            }

            return `${diff} Days` ;


        }
        return 'Any Week'

    },[startDate,endDate])


    const guestLabel = useMemo(()=>{
        if(guestCount){
            return `${guestCount} Guests`
        }

        return 'Add Guests'
    },[guestCount])


    return ( 
        <div onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row item-center justify-between">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-6 text-sm font-semibold">{locationLabel}</div>
                    <div className="hidden font-semibold text-sm px-6 sm:block text-center border-x-[1px] flex-1">{durationLabel}</div>
                    <div className="pl-6 pr-2 flex flex-row items-center gap-3 text-gray-600">
                        <div className="hidden sm:block ">{guestLabel}</div>

                        <div className="p-2 bg-rose-500 rounded-full text-white">
                            <BiSearch size = {18}/>
                        </div>
                        
                    </div>

                </div>

            </div>
        </div>
     );
}
 
export default Search;