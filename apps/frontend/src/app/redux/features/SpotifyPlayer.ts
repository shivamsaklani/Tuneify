import { TrackType } from "@/types/GlobalTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SpotifyPlayerType{
    Track:TrackType |null;
    playerReady:boolean | null;
    volume:number;
    isPlaying:boolean;
    device_id:string;
}

const InitialState:SpotifyPlayerType={
    Track:null,
    playerReady:null,
    volume:100,
    isPlaying:false,
    device_id:''
}



const SpotifyPlayer = createSlice({
    name:"Player",
    initialState:InitialState,
    reducers:{
        setDevice(state,action:PayloadAction<string>){
            state.device_id=action.payload;
        },
        setPlayerReady(state,action:PayloadAction<boolean>){
            state.playerReady=action.payload;
        },
        setVolume(state,action:PayloadAction<number>){
            state.volume=action.payload;
        },
        setPlaying(state,action:PayloadAction<boolean>){
            console.log(action.payload);
            state.isPlaying=action.payload;
        },
        setTrack(state,action:PayloadAction<TrackType>){
           state.Track=action.payload;
        },
        resetPlayer(state) {
            state.playerReady = false;
            state.Track = null;
            state.volume =0;
            state.isPlaying=false;
            state.device_id="";
          },
    }
});

export const {setPlayerReady,setDevice,setTrack,resetPlayer,setPlaying,setVolume}=SpotifyPlayer.actions;
export  default SpotifyPlayer.reducer; 