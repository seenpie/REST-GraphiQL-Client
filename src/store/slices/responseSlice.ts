import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResponseState = {
  data: string | null;
  isLoading: boolean;
  error: null | Error;
};

const initialState: ResponseState = {
  data: null,
  isLoading: false,
  error: null
};

export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    setResponse: (state, action: PayloadAction<string | null>) => {
      state.data = action.payload;
    },
    setResponseLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setResponseError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    }
  }
});

export const responseReducer = responseSlice.reducer;
