import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";

export const store = configureStore({
	reducer: { [articleApi.reducerPath]: articleApi.reducer },
	// eslint-disable-next-line no-undef
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(articleApi.middleware);
	},
});
