import SearchIcon from "@/app/assets/icons/Search.svg";
export const SearchBar =()=>{
    return(
        <div className="bg-white rounded-full py-2  flex w-full shadow-md">
         
           <div className="flex justify-between items-center">
           <div className="flex px-2 text-black">
                <SearchIcon className="size-5"/>
            </div>
            <div className="h-6 w-px bg-gray-300 mr-3" />
                <input type="text" placeholder="What do you want to play ?..." className="flex-1 w-full bg-transparent focus:outline-none text-black placeholder-gray-500" />
          
           </div>
        </div>
    )
}