import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { Author } from "../api/types";

interface AuthorsState {
    authors: Author[];
    filterValue: string;
}

// We define a partial RootState interface here to avoid circular dependency
// with store.ts. Ideally, we'd use the inferred RootState from store.ts,
// but that imports this file.
interface RootState {
    authors: AuthorsState;
}

const initialState: AuthorsState = {
    authors: [],
    filterValue: "",
};

const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        setAuthors(state, action: PayloadAction<Author[]>) {
            state.authors = action.payload;
        },
        setFilter(state, action: PayloadAction<string>) {
            state.filterValue = action.payload;
        },
    },
});

export const {
    setAuthors: setAuthorsAction,
    setFilter: setFilterAction
} = authorsSlice.actions;

export const useAuthors = () => useSelector((state: RootState) => state.authors.authors);
export const useFilter = () => useSelector((state: RootState) => state.authors.filterValue);

export default authorsSlice.reducer;
