import type { Author, Prediction } from './types';

export const getAuthors = async (search: string = ''): Promise<Author[]> => {
  try {
    const response = await fetch(`/api/authors/?search=${search}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching authors:', error);
    return Promise.resolve(authorsMock);
  }
};

export const getAuthorById = async (id: number): Promise<Author | undefined> => {
  try {
    const response = await fetch(`/api/authors/${id}/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching author with id ${id}:`, error);
    return Promise.resolve(authorsMock.find(author => author.id === id));
  }
}

export const createPrediction = async (text: string, authorIds: number[]): Promise<Prediction> => {
  try {
    const response = await fetch('/api/author-predictions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, author_ids: authorIds }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating prediction:', error);
    return Promise.resolve(predictionMock);
  }
};

export const getPrediction = async (id: number): Promise<Prediction | undefined> => {
  try {
    const response = await fetch(`/api/author-predictions/${id}/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching prediction with id ${id}:`, error);
    return Promise.resolve(predictionMock);
  }
};

export const deletePrediction = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`/api/author-predictions/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error(`Error deleting prediction with id ${id}:`, error);
    return Promise.resolve();
  }
};

export const authorsMock: Author[] = [
  {
    id: 1,
    name: 'Jane Austen',
    about: 'Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.',
    count_v: 0.1,
    count_i: 0.2,
    count_no: 0.3,
    count_li: 0.4,
    count_da: 0.5,
    count_zhe: 0.6,
    count_ili: 0.7,
    count_libo: 0.8,
    is_active: true,
    image_url: 'http://example.com/austen.jpg'
  },
  {
    id: 2,
    name: 'Leo Tolstoy',
    about: 'Count Lev Nikolayevich Tolstoy, usually referred to in English as Leo Tolstoy, was a Russian writer who is regarded as one of the greatest authors of all time.',
    count_v: 0.2,
    count_i: 0.3,
    count_no: 0.4,
    count_li: 0.5,
    count_da: 0.6,
    count_zhe: 0.7,
    count_ili: 0.8,
    count_libo: 0.9,
    is_active: true,
    image_url: 'http://example.com/tolstoy.jpg'
  }
];

export const predictionMock: Prediction = {
  id: 1,
  text: 'This is a sample text.',
  authors: [
    {
      id: 1,
      name: 'Jane Austen',
      about: 'Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.',
      count_v: 0.1,
      count_i: 0.2,
      count_no: 0.3,
      count_li: 0.4,
      count_da: 0.5,
      count_zhe: 0.6,
      count_ili: 0.7,
      count_libo: 0.8,
      is_active: true,
      image_url: 'http://example.com/austen.jpg'
    }
  ]
};
