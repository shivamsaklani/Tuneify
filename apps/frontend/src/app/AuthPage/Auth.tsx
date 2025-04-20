"use client";
import { Button } from "../components/Button";
import { SpotifyIcon } from "../components/Spotify";
import { Music, Music2 } from "lucide-react";
import { Tuneify } from "../components/Tuneify";

export const AuthPage = () => {
  const Authorization = async () => {
    window.location.href = "/api/v1/spotify/authorize";
  };

  return (
    <div className="min-h-screen bg-black/80 text-white">
    {/* Navbar */}
    <header className="">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <Tuneify/>


        <Button
            onclick={Authorization}
            size="sm"
          variant="secondary"
          >
            <div className="flex cursor-pointer items-center space-x-2 justify-center ">
              <SpotifyIcon className="h-6 w-6" />
              <span>Login with Spotify</span>
            </div>
          </Button>
      </div>
    </header>

    {/* Hero Section */}
    <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 sm:py-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-green-400 via-purple-500 to-purple-500 rounded-full animate-pulse">
  <Music2 className="h-full w-full text-transparent fill-white" />
</div>
        <h2 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
          Listen To Your Music
        </h2>
        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-green-400 via-purple-500 to-purple-500 rounded-full animate-pulse">
  <Music2 className="h-full w-full text-transparent fill-white" />
</div>
      </div>
      
      <p className="text-sm sm:text-lg text-gray-400 mb-12 max-w-md text-center">
        According to your mood
      </p>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-700/20 blur-3xl rounded-full"></div>
        <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Welcome to Tuneify
          </h1>
          <p className="text-lg text-gray-300 max-w-md mb-8 text-center">
            Connect with Spotify to access your music library, control playback, and discover new music tailored just for you.
          </p>

          <Button
            onclick={Authorization}
            size="lg"
          variant="secondary"
          >
            <div className="flex cursor-pointer items-center justify-center space-x-2">
              <SpotifyIcon className="h-6 w-6" />
              <span>Login with Spotify</span>
            </div>
          </Button>
        </div>
      </div>
    </main>
  </div>
  );
};
