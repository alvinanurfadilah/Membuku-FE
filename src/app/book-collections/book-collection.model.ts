export interface BookCollection {
  bookId: number;
  name: string;
  cover: string;
  author: { id: number; name: string };
  avgRating: number;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  readStatus: 'TO-READ' | 'READ' | 'CURRENTLY-READING';
  reviewNote: string | null;
  readDate: string | null;
  addedDate: string | null;
}

export type ReadStatus = 'TO-READ' | 'READ' | 'CURRENTLY-READING';

export const readStatusesLabel: { text: string; value: ReadStatus }[] = [
  { text: 'Mau Baca', value: 'TO-READ' },
  { text: 'Telah Baca', value: 'READ' },
  { text: 'Sedang di Baca', value: 'CURRENTLY-READING' },
];

export interface BookReview {
  rating: 1 | 2 | 3 | 4 | 5 | null;
  review1: string | null;
  readDate: string | null;
}
