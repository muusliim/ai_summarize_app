import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const _rapidApiKey = import.meta.env.VITE_API_KEY;

export const articleApi = createApi({
	reducerPath: "articleApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
		prepareHeaders: (headers) => {
			headers.set("X-RapidAPI-Key", _rapidApiKey);
			headers.set(
				"X-RapidAPI-Host",
				"article-extractor-and-summarizer.p.rapidapi.com"
			);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getSummary: builder.query({
			query: (params) =>
				`summarize?url=${encodeURIComponent(params.articleUrl)}&length=3&lang=ru`,
		}),
	}),
});

export const {useLazyGetSummaryQuery} = articleApi;
