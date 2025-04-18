import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo={
    name?:string,
    id?:string,
    email?:string
}


const initialState:UserInfo={
    name:'',
    id:'',
    email:''
}

const UserInfo = createSlice({
    name:"userInfo",
    initialState:initialState,
    reducers:{
        addUser(state,action: PayloadAction<UserInfo>){
            state.name=action.payload.name,
            state.email=action.payload.email,
            state.id=action.payload.id;
        }
    }
});

export const {addUser}=UserInfo.actions;
export default UserInfo.reducer;