"use client";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
export const MusicSection=()=>{
    const user= useSelector((state:RootState)=>state.userInfo);
    return(
   
        <div className="grid h-full w-full overflow-hidden">
          <section className="h-full text-white bg-black/40 rounded-md flex justify-center items-center">
          <p>Name: {user.name}</p>
  <p>Email: {user.email}</p>
  <p>ID: {user.id}</p>
        
        </section>
        </div>
       
       
    )
}