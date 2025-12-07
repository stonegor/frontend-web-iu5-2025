import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import type { PredictionCandidate, AuthorPredictionUpdate } from '../api/Api';

interface PredictionsState {
  prediction_id: number;
  count: number;
  
  authors: PredictionCandidate[];
  predictionData: {
      corpus?: string;
      status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
  };
  isDraft: boolean;
  error: string | null;
}

const initialState: PredictionsState = {
  prediction_id: NaN,
  count: NaN,
  authors: [],
  predictionData: {},
  isDraft: false,
  error: null,
};

export const getPrediction = createAsyncThunk(
    'predictions/getPrediction',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.authorPredictions.authorPredictionsRead(id);
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке предсказания');
        }
    }
);

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

export const deletePrediction = createAsyncThunk(
    'predictions/deletePrediction',
    async (id: string, { rejectWithValue }) => {
        try {
            await api.authorPredictions.authorPredictionsDelete(id);
            return id;
        } catch (error) {
            return rejectWithValue('Ошибка при удалении предсказания');
        }
    }
);

export const updatePrediction = createAsyncThunk(
    'predictions/updatePrediction',
    async ({ id, data }: { id: string; data: AuthorPredictionUpdate }, { rejectWithValue }) => {
        try {
            const response = await api.authorPredictions.authorPredictionsUpdate(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при обновлении предсказания');
        }
    }
);

export const deleteAuthorFromPrediction = createAsyncThunk(
    'predictions/deleteAuthorFromPrediction',
    async ({ predictionId, authorId }: { predictionId: string; authorId: string }, { rejectWithValue }) => {
        try {
            await api.authorPredictions.authorPredictionsAuthorDelete(predictionId, authorId);
            return authorId;
        } catch (error) {
            return rejectWithValue('Ошибка при удалении автора из предсказания');
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPrediction.fulfilled, (state, action) => {
                const data = action.payload as any; 
                state.authors = data.authors || [];
                state.predictionData = { corpus: data.corpus, status: data.status };
                state.isDraft = data.status === 'DRAFT';
                if (data.id) {
                    state.prediction_id = data.id;
                }
            })
            .addCase(getPrediction.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(addAuthorToPrediction.fulfilled, (state, action) => {
                const data = action.payload as any;
                if (data.id) {
                    state.prediction_id = data.id;
                }
                if (data.authors) {
                    state.count = data.authors.length;
                }
            })
            .addCase(deletePrediction.fulfilled, (state) => {
                state.prediction_id = NaN;
                state.count = NaN;
                state.authors = [];
                state.predictionData = {};
                state.isDraft = false;
            })
            .addCase(updatePrediction.fulfilled, (state, action) => {
                 state.predictionData.corpus = action.payload.corpus;
            })
            .addCase(deleteAuthorFromPrediction.fulfilled, (state, action) => {
                 state.authors = state.authors.filter(a => String((a.author as any)?.id) !== action.payload); 
                 state.count = state.authors.length;
            });
    }
});

export const { setPredictionId, setCount, setError, setPredictionData } = predictionsSlice.actions;
export default predictionsSlice.reducer;
