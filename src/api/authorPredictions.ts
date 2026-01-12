import { api } from './index';

export interface DraftAuthorPredictionIcon {
  id?: number;
  count?: number;
}

export const getDraftAuthorPrediction = async (): Promise<DraftAuthorPredictionIcon | null> => {
  try {
    const response = await api.authorPredictions.authorPredictionsDraftIconList();
    return response.data;
  } catch (error) {
    console.error('Error fetching draft prediction:', error);
    return null;
  }
}