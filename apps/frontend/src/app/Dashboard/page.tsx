"use client";
import { AuthPage } from "../AuthPage/Auth";
import { Header } from "./sections/Header";
import { MusicSection } from "./sections/MusicSection";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
export default function Dashboard(){
  
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);

    return(
        <>
        { (isAuthenticated)? <div className="bg-secondary min-h-screen">
            <Header/>
            <MusicSection/>
           </div>:
           <div>
            <AuthPage/>
           </div>
        }
        </>
    )
}