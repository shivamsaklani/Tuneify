import SearchIcon from "@/app/assets/icons/Search.svg";

export const SearchBar = () => {
    return (
        <div className="bg-secondary rounded-full py-2 px-4 flex items-center w-full shadow-lg">
            <SearchIcon className="size-5 text-black" />

            <div className="h-6 w-px bg-gray-300 mx-3" />
            <input
                type="text"
                placeholder="What do you want to play ?..."
                className="w-full bg-transparent focus:outline-none text-gray-300 placeholder-gray-300"
            />
        </div>
    );
};
