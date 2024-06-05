import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthor } from "../models/IAuthor";
import { ILocation } from "../models/ILocation";
export const filterServiceAPI = createApi({
  reducerPath: "FilterAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-front.framework.team",
  }),
  endpoints: (build) => ({
    fetchAuthors: build.query<IAuthor[], void>({
      query: () => ({
        url: "/authors",
      }),
    }),
    fetchLocations: build.query<ILocation[], void>({
        query: () => ({
          url: "/locations",
        }),
      }),
  }),
});
