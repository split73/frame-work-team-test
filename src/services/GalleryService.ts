import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICard } from "../models/ICard";
import { ICardData } from "../models/ICard";
export const galleryAPI = createApi({
  reducerPath: "galleryAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-front.framework.team",
  }),
  endpoints: (build) => ({
    fetchPaintings: build.query<
      ICard,
      {
        page: number;
        limit: number;
        filterByName: string;
        filterByAuthorId: string;
        filterByLocationId: string;
      }
    >({
      query: ({
        page = 1,
        limit = 6,
        filterByName = "",
        filterByAuthorId = "",
        filterByLocationId = "",
      }) => ({
        url: `/paintings?${filterByAuthorId}${filterByLocationId}`,
        params: {
          _page: page,
          _limit: limit,
          name_like: filterByName,
        },
      }),
      transformResponse: (response: ICardData[], meta): ICard => {
        const links = meta?.response?.headers.get("link");
        const data = response;
        return { data: data, paginationLastPageLink: links };
      },
    }),
  }),
});
