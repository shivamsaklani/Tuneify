import { createSlice } from "@reduxjs/toolkit";

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
        addUser(state,action){
            state.name=action.payload,
            state.email=action.payload,
            state.id=action.payload;
        }
    }
});

export const {addUser}=UserInfo.actions;
export default UserInfo.reducer;