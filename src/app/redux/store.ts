import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, userReducer } from "./slice";
export const store=configureStore({
    reducer:{
        user:userReducer,
        login:loginReducer
    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch