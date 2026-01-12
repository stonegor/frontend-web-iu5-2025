import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import type { PredictionCandidate, AuthorPredictionUpdate, AuthorPrediction } from '../api/Api';
import { logoutUserAsync } from './userSlice';

interface PredictionsState {
    prediction_id: number;
    count: number;

    authors: PredictionCandidate[];
    predictionData: {
        corpus?: string;
        status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
    };
    predictionsList: AuthorPrediction[];
    isDraft: boolean;
    error: string | null;
}

const initialState: PredictionsState = {
    prediction_id: NaN,
    count: NaN,
    authors: [],
    predictionData: {},
    predictionsList: [],
    isDraft: false,
    error: null,
};

// Keep this one as it might be used by AuthorsPage/AuthorCard in list view
export const addAuthorToPrediction = createAsyncThunk(
    'predictions/addAuthorToPrediction',
    async (authorId: number, { rejectWithValue }) => {
        try {
            const response = await api.authorPredictions.authorPredictionsDraftCreate({ author_id: authorId });
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при добавлении автора');
        }
    }
);

const predictionsSlice = createSlice({
    name: 'predictions',
    initialState,
    reducers: {
        setPredictionId: (state, action: PayloadAction<number | undefined>) => {
            state.prediction_id = action.payload ?? NaN;
        },
        setCount: (state, action: PayloadAction<number | undefined>) => {
            state.count = action.payload ?? NaN;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setPredictionData: (state, action: PayloadAction<AuthorPredictionUpdate>) => {
            state.predictionData = { ...state.predictionData, ...action.payload };
        },
        setPredictionsList: (state, action: PayloadAction<AuthorPrediction[]>) => {
            state.predictionsList = action.payload;
        },
        setPredictionDetails: (state, action: PayloadAction<any>) => {
            const data = action.payload;
            state.authors = data.authors || [];
            state.predictionData = { corpus: data.corpus, status: data.status };
            state.isDraft = data.status === 'DRAFT';
            if (data.id) {
                state.prediction_id = data.id;
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
        updatePredictionStatusInState: (state) => {
            state.isDraft = false;
            state.predictionData.status = "FORMED";
            state.prediction_id = NaN;
            state.count = NaN;
        },
        updatePredictionInList: (state, action: PayloadAction<AuthorPrediction>) => {
            const updated = action.payload;
            const index = state.predictionsList.findIndex(p => p.id === updated.id);
            if (index !== -1) {
                state.predictionsList[index] = updated;
            }
        },
        updatePredictionStatusInList: (state, action: PayloadAction<{ id: number, status: string }>) => {
            const { id, status } = action.payload;
            const index = state.predictionsList.findIndex(p => p.id === id);
            if (index !== -1) {
                state.predictionsList[index].status = status as any;
            }
        },
        resetPredictionState: (state) => {
            state.prediction_id = NaN;
            state.count = NaN;
            state.authors = [];
            state.predictionData = {};
            state.isDraft = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAuthorToPrediction.fulfilled, (state, action) => {
                const data = action.payload as any;
                if (data.id) {
                    state.prediction_id = data.id;
                }
                if (data.authors) {
                    state.count = data.authors.length;
                }
            })
            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.prediction_id = NaN;
                state.count = NaN;
                state.authors = [];
                state.predictionData = {};
                state.predictionsList = [];
                state.isDraft = false;
                state.error = null;
            });
    }
});

export const {
    setPredictionId,
    setCount,
    setError,
    setPredictionData,
    setPredictionsList,
    setPredictionDetails,
    removeAuthorFromState,
    updateAuthorStageInState,
    updatePredictionStatusInState,
    updatePredictionInList,
    updatePredictionStatusInList,
    resetPredictionState
} = predictionsSlice.actions;

export default predictionsSlice.reducer;
