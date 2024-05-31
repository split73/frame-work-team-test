import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICard } from "../models/ICard";
import { ICardData } from "../models/ICard";
import { IAuthor } from "../models/IAuthor";
export const cardAPI = createApi({
  reducerPath: "cardAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://test-front.framework.team" }),
  endpoints: (build) => ({
    fetchPaintings: build.query<
      ICard,
      { page: number; limit: number; filterParam: string }
    >({
      query: ({ page = 1, limit = 6, filterParam = "" }) => ({
        url: "/paintings",
        params: {
          _page: page,
          _limit: limit,
          q: filterParam,
        },
      }),
      transformResponse: async (
        response: ICardData[],
        meta
      ): Promise<ICard> => {
        const links = meta?.response?.headers.get("link");
        const data = await response;
        return { data: data, paginationLastPageLink: links };
      },
    }),
    fetchAuthors: build.query<IAuthor[], void>({
      query: () => ({
        url: "/authors"
      })
    })
  }),
});
