import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import type { PredictionCandidate, AuthorPredictionUpdate, AuthorPrediction } from '../api/Api';
import { logoutUserAsync } from './userSlice';

interface AuthorPredictionsState {
    author_prediction_id: number;
    count: number;

    authors: PredictionCandidate[];
    authorPredictionData: {
        corpus?: string;
        status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
    };
    authorPredictionsList: AuthorPrediction[];
    isDraft: boolean;
    error: string | null;
}

const initialState: AuthorPredictionsState = {
    author_prediction_id: NaN,
    count: NaN,
    authors: [],
    authorPredictionData: {},
    authorPredictionsList: [],
    isDraft: false,
    error: null,
};

// Keep this one as it might be used by AuthorsPage/AuthorCard in list view
export const addAuthorToAuthorPrediction = createAsyncThunk(
    'authorPredictions/addAuthorToAuthorPrediction',
    async (authorId: number, { rejectWithValue }) => {
        try {
            const response = await api.authorPredictions.authorPredictionsDraftCreate({ author_id: authorId });
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при добавлении автора');
        }
    }
);

const authorPredictionsSlice = createSlice({
    name: 'authorPredictions',
    initialState,
    reducers: {
        setAuthorPredictionId: (state, action: PayloadAction<number | undefined>) => {
            state.author_prediction_id = action.payload ?? NaN;
        },
        setCount: (state, action: PayloadAction<number | undefined>) => {
            state.count = action.payload ?? NaN;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setAuthorPredictionData: (state, action: PayloadAction<AuthorPredictionUpdate>) => {
            state.authorPredictionData = { ...state.authorPredictionData, ...action.payload };
        },
        setAuthorPredictionsList: (state, action: PayloadAction<AuthorPrediction[]>) => {
            state.authorPredictionsList = action.payload;
        },
        setAuthorPredictionDetails: (state, action: PayloadAction<any>) => {
            const data = action.payload;
            state.authors = data.authors || [];
            state.authorPredictionData = { corpus: data.corpus, status: data.status };
            state.isDraft = data.status === 'DRAFT';
            if (data.id) {
                state.author_prediction_id = data.id;
            }
        },
        removeAuthorFromState: (state, action: PayloadAction<string>) => {
            state.authors = state.authors.filter(a => String((a.author as any)?.id) !== action.payload);
            state.count = state.authors.length;
        },
        updateAuthorStageInState: (state, action: PayloadAction<{ authorId: string, stage: string }>) => {
            const author = state.authors.find(a => String((a.author as any)?.id) === action.payload.authorId);
            if (author) {
                author.stage = action.payload.stage as any;
            }
        },
        updateAuthorPredictionStatusInState: (state) => {
            state.isDraft = false;
            state.authorPredictionData.status = "FORMED";
            state.author_prediction_id = NaN;
            state.count = NaN;
        },
        updateAuthorPredictionInList: (state, action: PayloadAction<AuthorPrediction>) => {
            const updated = action.payload;
            const index = state.authorPredictionsList.findIndex(p => p.id === updated.id);
            if (index !== -1) {
                state.authorPredictionsList[index] = updated;
            }
        },
        updateAuthorPredictionStatusInList: (state, action: PayloadAction<{ id: number, status: string }>) => {
            const { id, status } = action.payload;
            const index = state.authorPredictionsList.findIndex(p => p.id === id);
            if (index !== -1) {
                state.authorPredictionsList[index].status = status as any;
            }
        },
        resetAuthorPredictionState: (state) => {
            state.author_prediction_id = NaN;
            state.count = NaN;
            state.authors = [];
            state.authorPredictionData = {};
            state.isDraft = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAuthorToAuthorPrediction.fulfilled, (state, action) => {
                const data = action.payload as any;
                // Backend returns { message: string, author_prediction: AuthorPrediction }
                const prediction = data.author_prediction || data; 
                
                if (prediction.id) {
                    state.author_prediction_id = prediction.id;
                }
                if (prediction.authors) {
                    state.count = prediction.authors.length;
                }
            })
            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.author_prediction_id = NaN;
                state.count = NaN;
                state.authors = [];
                state.authorPredictionData = {};
                state.authorPredictionsList = [];
                state.isDraft = false;
                state.error = null;
            });
    }
});

export const {
    setAuthorPredictionId,
    setCount,
    setError,
    setAuthorPredictionData,
    setAuthorPredictionsList,
    setAuthorPredictionDetails,
    removeAuthorFromState,
    updateAuthorStageInState,
    updateAuthorPredictionStatusInState,
    updateAuthorPredictionInList,
    updateAuthorPredictionStatusInList,
    resetAuthorPredictionState
} = authorPredictionsSlice.actions;

export default authorPredictionsSlice.reducer;