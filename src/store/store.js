import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/AuthSlice"
import OffersReducer from "../features/OfferSlice"

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        offers: OffersReducer,
    }
})