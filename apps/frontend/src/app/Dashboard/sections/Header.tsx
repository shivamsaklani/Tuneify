"use client";
import { Camera } from "@/app/components/Camera";
import { MenuToggle } from "@/app/components/MenuToggle";
import { ProfilIcon } from "@/app/components/ProfileIcon";
import { SearchBar } from "@/app/components/SearchBar";
import { SpotifyIcon } from "@/app/components/Spotify"
import { useState } from "react";

export const Header=()=>{
  const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="max-w-screen text-white bg-primary/90 py-5 px-5">
          <div className="flex items-center justify-between">
         
          <div className="flex md:hidden">
         <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
         
          <div className="flex  cursor-pointer items-center">
           <div className="flex flex-rows justify-between  space-x-3">
           <div className="flex items-center justify-between space-x-2">
           <SpotifyIcon className="sm:size-10 size-5"/>
           <h1 className="sm:text-3xl text-xl">Tuneify</h1>
           </div>
            </div>
            <div className="hidden absolute left-1/4 w-1/2 md:flex">
            <SearchBar/>
          </div>
         
          </div>
          
          <div className="hidden relative md:flex justify-between items-center space-x-2 px-2">
            
            <div className="flex  cursor-pointer flex-cols justify-center items-center absolute space-x-1 right-16">
            <Camera className="size-10 text-white"/>
            <span className="text-sm">Open Camera</span>
         
              </div>   
              <ProfilIcon>
              S
              </ProfilIcon>
          </div>

          
         
          </div>
        </div>
    )
}