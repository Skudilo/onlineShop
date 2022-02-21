import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://shopping-server0001.herokuapp.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (name) => `products`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
