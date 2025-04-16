"use client";
import { Button } from "../components/Button";
import { SpotifyIcon } from "../components/Spotify";
export const AuthPage =()=>{

    return(
        <div className="flex bg-radial-[at_50%_75%] from-primary to-secondary/30 justify-center items-center bg-primary min-h-screen px-4">
        <div className="w-full flex flex-col justify-between  space-y-5 max-w-md bg-black/70 text-white rounded-xl backdrop-blur-xl backdrop-brightness-150 shadow-lg p-8">
      

         <div className="flex font-arial flex-col items-center">
          <h1 className="sm:text-4xl text-xl ">Listen your Music</h1>
          <span className="text-sm sm:text-lg ">According to your mood</span>
         </div>
         <hr className="w-full h-2 text-secondary"/>
        
         <Button onclick={()=>{} } size="lg" variant="secondary">
          <div className="flex flex-col cursor-pointer justify-center items-center">
          <SpotifyIcon className="sm:size-20 size-10"/>
          <h1>
          Login to Spotify 
            </h1>
          </div>
          
         
          </Button>
          </div>  
        </div>
    )
}