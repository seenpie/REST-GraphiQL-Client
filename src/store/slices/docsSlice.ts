import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { GraphQLSchema } from "graphql/type";

type DocsState = {
  data: GraphQLSchema | null;
  isLoading: boolean;
  error: null | Error;
};

const initialState: DocsState = {
  data: null,
  isLoading: false,
  error: null
};

export const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    setDocs: (state, action: PayloadAction<GraphQLSchema | null>) => {
      state.data = action.payload as Draft<GraphQLSchema> | null;
    },
    setDocsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDocsError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setDocs, setDocsError, setDocsLoading } = docsSlice.actions;
export const docsReducer = docsSlice.reducer;
