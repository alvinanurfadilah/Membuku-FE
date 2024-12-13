export interface Book {
  id: string;
  name: string;
  cover: string;
  releaseDate: string;
  author: { id: number; name: string };
}
