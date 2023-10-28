import { configureStore } from "@reduxjs/toolkit"
import userDetailReducer from "../features/userDetailsSlice"

export const store = configureStore({
    reducer: {
        userDetail: userDetailReducer
    }
})