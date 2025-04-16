import { ReactNode } from "react"

export const ProfilIcon=({children}:{
    children:ReactNode
})=>{
    return(
        <div className="absolute right-3 bg-secondary/30 cursor-pointer text-sans text-lg size-14 flex justify-center items-center rounded-full">
           <div className="flex bg-purple-500 justify-center size-10 items-center rounded-full">
           {children}
           </div>
            

        </div>
    )
}