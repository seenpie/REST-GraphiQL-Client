import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    setError: (
      state,
      { payload: { error } }: PayloadAction<{ error: string }>
    ) => error
  }
});

export const { setError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
