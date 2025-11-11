export interface Author {
  id: number;
  name: string;
  image_url: string;
  count_v: number;
  count_i: number;
  count_no: number;
  count_li: number;
  count_da: number;
  count_zhe: number;
  count_ili: number;
  count_libo: number;
  about: string;
}

export interface Prediction {
  id: number;
  text: string;
  authors: Author[];
}
