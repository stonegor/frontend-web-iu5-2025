import { api } from './index';

export interface DraftPredictionIcon {
  id?: number;
  count?: number;
}

export const getDraftPrediction = async (): Promise<DraftPredictionIcon | null> => {
  try {
    const response = await api.authorPredictions.authorPredictionsDraftIconList();
    return response.data;
  } catch (error) {
    console.error('Error fetching draft prediction:', error);
    return null;
  }
}
