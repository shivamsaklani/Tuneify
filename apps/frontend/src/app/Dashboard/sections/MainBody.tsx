import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Header } from "./Header";
import { MusicSection } from "./MusicSection";
import { Sidebar } from "./Sidebar";
import { useEffect, useState} from "react";
import axios from "axios";
import {useDispatch  , useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addUser } from "@/app/redux/features/UserInfo";
import { loginSuccess } from "@/app/redux/features/loginSlice";
import { setLoading } from "@/app/redux/features/Loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CameraDashboard } from "./CameraDashboard";
import SpotifyPlayer from "./SpotifyWeb";

export const MainBody = () => {
const [camera,setCamera]=useState(false);
const dispatch = useDispatch();
const token =useSelector((state:RootState)=>state.auth.token);
const refresh_token = useSelector((state:RootState)=>state.auth.refresh_token);
const isPremium=useSelector((state:RootState)=>state.userInfo.isPremium);

  useEffect(() => {
    dispatch(setLoading(true));
    if (!token) return;

    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = {
          name: data.display_name,
          email: data.email,
          id: data.id,
          isPremium : data.product === "premium"?true:false
        };
        console.log(data.premium);
        console.log(user);
        dispatch(
          addUser(user)
        );
        dispatch(setLoading(false));
       
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
     
    };
    fetchUserInfo();
  }, [dispatch,token]);

  useEffect(()=>{
   if(!token) return;
   const GenerateNewToken = async ()=>{
     try {
       const NewToken = await axios.get(`http://localhost:3000/api/v1/spotify/auth/refresh_token?refresh_token=${refresh_token}`);
       dispatch(loginSuccess({token:NewToken.data.token,refresh_token:NewToken.data.new_refresh_token}));
     } catch (error) {
      console.log(error);
      
     }
   }
   GenerateNewToken();
  },[dispatch]);
  return (
    <>
   
    <div className="bg-primary h-screen flex flex-col">
     
       <Header setCamera={()=>setCamera(!camera)} />
    
      <ResizablePanelGroup direction="horizontal" className="flex-grow gap-2 p-2 pb-5">
      {camera ?<CameraDashboard/>: <>
        <ResizablePanel defaultSize={20} className="md:flex hidden h-full rounded-md bg-black/40 " minSize={5} maxSize={20} >
        <ScrollArea className="w-full sm:grid hidden pt-5 h-[96] rounded-md">
        <Sidebar />
        </ScrollArea>
          
        
        </ResizablePanel>
        <ResizableHandle className="md:flex hidden 
         rounded-full
         bg-gray-400/0 hover:bg-gray-300
        cursor-col-resize"/>
        <ResizablePanel defaultSize={70}>
          <MusicSection />
        </ResizablePanel></>
}
      </ResizablePanelGroup>
      {isPremium?
        ((token)?
        <SpotifyPlayer token={token}/>:
      <div>
        Not Working
      </div>):
      <div className="flex flex-col justify-center items-center text-gray-500">
        <h1 className="text-3xl">Not a preimum User</h1>
        <span>Due to Spotify Policies only Preimum users can access their Player</span>
      </div>
      }
    </div>
    </>
  );
};
