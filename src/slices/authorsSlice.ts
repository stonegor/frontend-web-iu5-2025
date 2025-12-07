import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { api } from "../api";
import type { Author } from "../api/Api";
import { AUTHORS_MOCK } from "../api/mock";

interface AuthorsState {
    authors: Author[];
    filterValue: string;
    loading: boolean;
    error: string | null;
}

interface RootState {
    authors: AuthorsState;
}

const initialState: AuthorsState = {
    authors: [],
    filterValue: "",
    loading: false,
    error: null,
};

export const getAuthorsList = createAsyncThunk(
    'authors/getAuthorsList',
    async (_, { getState, rejectWithValue }) => {
        const { authors } = getState() as RootState;
        try {
            const response = await api.authors.authorsList({ name: authors.filterValue });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch authors", error);
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.filterValue = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthorsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAuthorsList.fulfilled, (state, action) => {
                state.loading = false;
                state.authors = action.payload;
            })
            .addCase(getAuthorsList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // Fallback to mock data on error, filtering by current filterValue
                state.authors = AUTHORS_MOCK.filter((item) =>
                    item.name?.toLowerCase().includes(state.filterValue.toLowerCase())
                );
            });
    },
});

export const {
    setFilter: setFilterAction
} = authorsSlice.actions;

export const useAuthors = () => useSelector((state: RootState) => state.authors.authors);
export const useFilter = () => useSelector((state: RootState) => state.authors.filterValue);
export const useAuthorsLoading = () => useSelector((state: RootState) => state.authors.loading);

export default authorsSlice.reducer;
