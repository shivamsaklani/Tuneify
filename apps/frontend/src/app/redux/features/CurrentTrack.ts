import { TrackType } from "@/types/GlobalTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const InitialState:TrackType={
    id:'',
    name:'',
    duration:0,
    img:''
}



const CurrentTrack = createSlice({
    name:"Track",
    initialState:InitialState,
    reducers:{
        setCurrentTrack(state,action:PayloadAction<TrackType>){
            state.id=action.payload.id;
            state.name= action.payload.name;
            state.duration=action.payload.duration;
            state.img= action.payload.img;
        }
    }
});

export const {setCurrentTrack}=CurrentTrack.actions;
export default CurrentTrack.reducer;