import { RootState } from "@/store/store";

export const selectTab = (state: RootState) => state.tab;
export const selectError = (state: RootState) => state.error;
export const selectDocs = (state: RootState) => state.docs;
export const selectResponse = (state: RootState) => state.response;
