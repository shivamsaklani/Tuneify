"use client";
import { AuthPage } from "../AuthPage/Auth";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { MainBody } from "./sections/MainBody";
export default function Dashboard(){
  
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);

    return(
        <>
        { (isAuthenticated)? <div>
            <MainBody/>
           
           </div>:
           <div>
            <AuthPage/>
           </div>
        }
        </>
    )
}