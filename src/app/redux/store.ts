import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, userInfoReducer, userReducer } from "./slice";
export const store=configureStore({
    reducer:{
        user:userReducer,
        login:loginReducer,
        userInfo:userInfoReducer
    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch