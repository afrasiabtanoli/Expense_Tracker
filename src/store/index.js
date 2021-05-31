import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { web3Reducer } from "./web3Reducer";

const store = configureStore({
    reducer: {
        web3: web3Reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutable: false,
    })
})

export default store;