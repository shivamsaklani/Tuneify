import { Music } from "lucide-react"

export const Tuneify =()=>{
    return(
         <div className="flex items-center space-x-2">
          <Music className="size-12 text-green-500" />
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-600">
            Tuneify
          </span>
        </div>
    )
}