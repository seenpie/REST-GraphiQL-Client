import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeadersItem } from "@/models/types";

type Response = {
  data: string;
  status?: number;
};

type TabState = {
  id: number;
  saveName: string;
  url: string;
  query: string;
  response: Response;
  variables: string;
  headers: HeadersItem[];
  isLoading: boolean;
};

const initialState: TabState = {
  id: new Date().getTime(),
  saveName: "",
  url: "",
  query: "",
  response: { data: "" },
  variables: "",
  headers: [],
  isLoading: false
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setResponse: (state, action: PayloadAction<Response>) => {
      state.response = action.payload;
    },

    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    },

    setHeaders: (state, action: PayloadAction<HeadersItem>) => {
      const isHeadersExist = state.headers.find(
        (item) => item.id === action.payload.id
      );

      if (isHeadersExist) {
        const stateWithoutHeaders = state.headers.filter(
          (item) => item.id !== action.payload.id
        );
        state.headers = [...stateWithoutHeaders, action.payload];
      } else {
        state.headers = [...state.headers, action.payload];
      }
    },

    removeHeaders: (state, action: PayloadAction<string>) => {
      state.headers = state.headers.filter(
        (item) => item.id !== action.payload
      );
    }
  }
});

export const {
  setUrl,
  setResponse,
  setHeaders,
  removeHeaders,
  setVariables,
  setQuery,
  setIsLoading
} = tabSlice.actions;

export const tabReducer = tabSlice.reducer;
