"use client";
import axios from "axios";
import { Button } from "../components/Button";
import { SpotifyIcon } from "../components/Spotify";
import MusicIcon from "@/app/assets/icons/Music.svg";

const Authorization = async () => {
  // const clientId= process.env.NEXT_PUBLIC_ClientID;
  // const redirectUrl = process.env.NEXT_PUBLIC_RedirectURL;
  // const apiUrl= "https://accounts.spotify.com/authorize/";
  // var scope = ["streaming",
  // "user-read-email",
  // "user-read-private"];

  // window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
  window.location.href = "/api/v1/spotify/authorize";

}
export const AuthPage = () => {

  return (
    <div className="flex bg-radial-[at_50%_75%] from-primary to-secondary/30 justify-center items-center bg-primary min-h-screen px-4">
      <div className="w-full flex flex-col justify-between  space-y-5 max-w-md bg-black/70 text-white rounded-xl backdrop-blur-xl backdrop-brightness-150 shadow-lg p-8">


        <div className="flex font-arial flex-col items-center">
          <div className=" gap-2 flex justify-center items-center">
            <MusicIcon className="sm:size-10 size-5" />
            <span className="sm:text-4xl  ">Listen your Music</span>
            <MusicIcon className="sm:size-10 size-5" />
          </div>
          <span className="text-sm sm:text-lg ">According to your mood</span>
        </div>
        <hr className="w-full h-2 text-secondary" />

        <Button onclick={Authorization} size="lg" variant="secondary">
          <div className="flex flex-col cursor-pointer justify-center items-center">
            <SpotifyIcon className="sm:size-20 size-10" />
            <h1>
              Login to Spotify
            </h1>
          </div>


        </Button>
      </div>
    </div>
  )
}