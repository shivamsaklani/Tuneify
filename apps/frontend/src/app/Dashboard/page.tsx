import { Header } from "./sections/Header";
import { MusicSection } from "./sections/MusicSection";

export default function Dashboard(){

    return(
        <>
        { (true)? <div className="bg-secondary min-h-screen">
            <Header/>
            <MusicSection/>
           </div>:
           <div>
            Please login
           </div>
        }
        </>
    )
}