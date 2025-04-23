"use client";
import { Camera } from "@/app/components/Camera";
import { MenuToggle } from "@/app/components/MenuToggle";
import { ProfilIcon } from "@/app/components/ProfileIcon";
import { SearchBar } from "@/app/components/SearchBar";
import { SpotifyIcon } from "@/app/components/Spotify";
import { Tuneify } from "@/app/components/Tuneify";
import { RootState } from "@/app/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Header = ({setCamera}:{
  setCamera:()=>void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoading = useSelector((state: RootState) => state.isLoading);

  return (
    <div className="max-w-screen text-white bg-primary/90 py-5 px-5">
      <div className="flex items-center justify-between">
        <div className="flex cursor-pointer items-center">
          {isLoading ? (
            // Skeleton Placeholder
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          ) : (
            // Actual Logo and Name
           <Tuneify/>
          )}
          <div className="hidden absolute left-1/4 w-1/2 md:flex">
            {isLoading ? <Skeleton className="h-10 w-full rounded-md" /> : <SearchBar />}
          </div>
        </div>

        <div className="hidden relative md:flex justify-between items-center space-x-2 px-2">
          {isLoading ? (
            <div className="flex space-x-2 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ) : (
            <div onClick={setCamera} className="flex cursor-pointer flex-cols justify-center items-center absolute space-x-1 right-16">
              <Camera className="size-10 text-white" />
              <span className="text-sm">Open Camera</span>
            </div>
          )}

          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <ProfilIcon>S</ProfilIcon>
          )}
        </div>

        <div className="flex md:hidden">
          <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};
