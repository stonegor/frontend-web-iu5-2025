export interface Author {
  id: number;
  name: string;
  about: string;
  count_v: number;
  count_i: number;
  count_no: number;
  count_li: number;
  count_da: number;
  count_zhe: number;
  count_ili: number;
  count_libo: number;
  is_active: boolean;
  image_url: string;
}

export interface Prediction {
  id: number;
  text: string;
  authors: Author[];
}

export interface PredictionResult {
  author: Author;
  probability: number;
}
