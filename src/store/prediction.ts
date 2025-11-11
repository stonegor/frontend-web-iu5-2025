import type { Author } from '../api/types';

class PredictionStore {
  private authors: Author[] = [];

  addAuthor(author: Author) {
    if (!this.authors.find((a) => a.id === author.id)) {
      this.authors.push(author);
    }
  }

  removeAuthor(authorId: number) {
    this.authors = this.authors.filter((a) => a.id !== authorId);
  }

  getAuthors() {
    return this.authors;
  }

  getAuthorsCount() {
    return this.authors.length;
  }
}

const predictionStore = new PredictionStore();
export default predictionStore;

