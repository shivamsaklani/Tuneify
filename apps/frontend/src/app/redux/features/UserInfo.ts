import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo={
    name?:string,
    id?:string,
    email?:string,
    isPremium:boolean,
}


const initialState:UserInfo={
    name:'',
    id:'',
    email:'',
    isPremium:false,
}

const UserInfo = createSlice({
    name:"userInfo",
    initialState:initialState,
    reducers:{
        addUser(state,action: PayloadAction<UserInfo>){
            state.name=action.payload.name,
            state.email=action.payload.email,
            state.id=action.payload.id;
            state.isPremium=action.payload.isPremium
        }
    }
});

export const {addUser}=UserInfo.actions;
export default UserInfo.reducer;