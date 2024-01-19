'use client'
import useSearchModalModel from '@/app/hooks/UseSearchModal';
import {BiSearch} from 'react-icons/bi'
const Search = () => {

    const searchModal = useSearchModalModel()
    return ( 
        <div onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row item-center justify-between">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-6 text-sm font-semibold">anything</div>
                    <div className="hidden font-semibold text-sm px-6 sm:block text-center border-x-[1px] flex-1">Any week</div>
                    <div className="pl-6 pr-2 flex flex-row items-center gap-3 text-gray-600">
                        <div className="hidden sm:block ">Add Guest</div>

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