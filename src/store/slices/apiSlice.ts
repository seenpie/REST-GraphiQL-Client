import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getIntrospectionQuery } from "graphql/utilities";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getSchema: builder.mutation({
      query: (url) => ({
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: getIntrospectionQuery() })
      })
    }),
    getResponse: builder.mutation({
      query: ({ url, query, variables, headers }) => ({
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: { query, variables }
      }),
      transformResponse: (response, meta) => {
        return {
          data: JSON.stringify(response, null, 2),
          status: meta?.response?.status
        };
      }
    })
  })
});

export const { useGetSchemaMutation, useGetResponseMutation } = apiSlice;
