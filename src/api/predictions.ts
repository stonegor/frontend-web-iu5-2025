import { API_BASE_URL } from '../config'
import type { Author } from './types'

export interface PredictionAuthor {
  author: Author;
  stage: string;
}

export interface PredictionResponse {
  status: string;
  corpus: string;
  authors: PredictionAuthor[];
}

export const getDraftPrediction = async (): Promise<PredictionResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/author-predictions/draft/icon`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching draft prediction:', error)
    return null
  }
}
