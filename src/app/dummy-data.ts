export const DUMMY_HIGHLIGHTED_BOOKS: {
  id: string;
  name: string;
  authorName: string;
  cover: string;
  releaseDate: string;
  highlightOrder: number;
}[] = [
  {
    id: 'b1',
    name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    authorName: 'James Clear',
    cover: 'atomic-habits.jpeg',
    releaseDate: '2018-10-16',
    highlightOrder: 1,
  },
  {
    id: 'b2',
    name: 'Rich Dad, Poor Dad',
    authorName: 'Robert Kiyosaki',
    cover: 'rich-dad-poor-dad.jpeg',
    releaseDate: '2000-04-01',
    highlightOrder: 2,
  },
  {
    id: 'b3',
    name: 'Psychology of Money',
    authorName: 'Morgan Housel',
    cover: 'psychology-of-money.jpeg',
    releaseDate: '2020-09-08',
    highlightOrder: 3,
  },
];

export const DUMMY_USER_BOOKS: {
  id: string;
  name: string;
  cover: string;
  author: { id: number; name: string };
  avgRating: number;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  readStatus: 'mau-baca' | 'sedang-baca' | 'telah-baca';
  review: string | null;
  readDate: string | null;
  addedDate: string | null;
}[] = [
  {
    id: 'b3',
    name: 'The Great Gatsby',
    cover: 'the-great-gatsby.jpeg',
    author: { id: 101, name: 'F. Scott Fitzgerald' },
    avgRating: 4.8,
    rating: 4,
    readStatus: 'telah-baca',
    review: 'A fascinating tale of love, wealth, and the American Dream.',
    readDate: '2024-03-12',
    addedDate: '2024-01-20',
  },
  {
    id: 'b4',
    name: 'To Kill a Mockingbird',
    cover: 'to-kill-a-mockingbird.jpeg',
    author: { id: 102, name: 'Harper Lee' },
    avgRating: 4.2,
    rating: 5,
    readStatus: 'telah-baca',
    review: 'A powerful story about justice and racial inequality.',
    readDate: '2024-05-15',
    addedDate: '2024-02-18',
  },
  {
    id: 'b5',
    name: '1984',
    cover: '1984.jpeg',
    author: { id: 103, name: 'George Orwell' },
    avgRating: 3.5,
    rating: 5,
    readStatus: 'sedang-baca',
    review: 'A chilling dystopian novel that feels increasingly relevant.',
    readDate: null,
    addedDate: '2024-04-10',
  },
  {
    id: 'b6',
    name: 'The Catcher in the Rye',
    cover: 'the-catcher-in-the-rye.jpeg',
    author: { id: 104, name: 'J.D. Salinger' },
    avgRating: 3.9,
    rating: null,
    readStatus: 'mau-baca',
    review: null,
    readDate: null,
    addedDate: '2024-06-05',
  },
  {
    id: 'b7',
    name: 'Pride and Prejudice',
    cover: 'pride-and-prejudice.jpeg',
    author: { id: 105, name: 'Jane Austen' },
    avgRating: 3.7,
    rating: 2,
    readStatus: 'telah-baca',
    review: null,
    readDate: '2024-07-21',
    addedDate: '2024-03-14',
  },
  {
    id: 'b8',
    name: 'The Hobbit',
    cover: 'the-hobbit.jpeg',
    author: { id: 106, name: 'J.R.R. Tolkien' },
    avgRating: 4.2,
    rating: 4,
    readStatus: 'sedang-baca',
    review:
      'An enchanting fantasy adventure that sets the stage for The Lord of the Rings.',
    readDate: '',
    addedDate: '2024-05-25',
  },
  {
    id: 'b9',
    name: 'Moby-Dick',
    cover: 'moby-dick.jpeg',
    author: { id: 107, name: 'Herman Melville' },
    avgRating: 3.8,
    rating: null,
    readStatus: 'mau-baca',
    review: null,
    readDate: null,
    addedDate: '2024-02-11',
  },
  {
    id: 'b10',
    name: 'War and Peace',
    cover: 'war-and-peace.jpeg',
    author: { id: 108, name: 'Leo Tolstoy' },
    avgRating: 4.7,
    rating: null,
    readStatus: 'mau-baca',
    review: 'An immense and intricate tapestry of Russian life.',
    readDate: '',
    addedDate: '2024-01-30',
  },
  {
    id: 'b11',
    name: 'The Brothers Karamazov',
    cover: 'the-brothers-karamazov.jpeg',
    author: { id: 109, name: 'Fyodor Dostoevsky' },
    avgRating: 4.7,
    rating: 5,
    readStatus: 'telah-baca',
    review: null,
    readDate: '2024-06-28',
    addedDate: '2024-02-25',
  },
  {
    id: 'b12',
    name: 'Brave New World',
    cover: 'brave-new-world.jpeg',
    author: { id: 110, name: 'Aldous Huxley' },
    avgRating: 3.8,
    rating: null,
    readStatus: 'mau-baca',
    review: null,
    readDate: null,
    addedDate: '2024-03-22',
  },
];

export const DUMMY_BOOKS: {
  id: string;
  name: string;
  cover: string;
  releaseDate: string;
  author: { id: number; name: string };
}[] = [
  {
    id: 'b1',
    name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: { id: 112, name: 'James Clear' },
    cover: 'atomic-habits.jpeg',
    releaseDate: '2018-10-16',
  },
  {
    id: 'b2',
    name: 'Rich Dad, Poor Dad',
    author: { id: 99, name: 'Robert Kiyosaki' },
    cover: 'rich-dad-poor-dad.jpeg',
    releaseDate: '2000-04-01',
  },
  {
    id: 'b3',
    name: 'Psychology of Money',
    author: { id: 111, name: 'Morgan Housel' },
    cover: 'psychology-of-money.jpeg',
    releaseDate: '2020-09-08',
  },
  {
    id: 'b4',
    name: 'The Great Gatsby',
    cover: 'the-great-gatsby.jpeg',
    author: { id: 101, name: 'F. Scott Fitzgerald' },
    releaseDate: '1925-04-10',
  },
  {
    id: 'b5',
    name: 'To Kill a Mockingbird',
    cover: 'to-kill-a-mockingbird.jpeg',
    author: { id: 102, name: 'Harper Lee' },
    releaseDate: '1960-07-11',
  },
  {
    id: 'b6',
    name: '1984',
    cover: '1984.jpeg',
    author: { id: 103, name: 'George Orwell' },
    releaseDate: '1949-06-08',
  },
  {
    id: 'b7',
    name: 'The Catcher in the Rye',
    cover: 'the-catcher-in-the-rye.jpeg',
    author: { id: 104, name: 'J.D. Salinger' },
    releaseDate: '1951-07-16',
  },
  {
    id: 'b8',
    name: 'Pride and Prejudice',
    cover: 'pride-and-prejudice.jpeg',
    author: { id: 105, name: 'Jane Austen' },
    releaseDate: '1813-01-28',
  },
  {
    id: 'b9',
    name: 'The Hobbit',
    cover: 'the-hobbit.jpeg',
    author: { id: 106, name: 'J.R.R. Tolkien' },
    releaseDate: '1937-09-21',
  },
  {
    id: 'b10',
    name: 'Moby-Dick',
    cover: 'moby-dick.jpeg',
    author: { id: 107, name: 'Herman Melville' },
    releaseDate: '1851-11-14',
  },
  {
    id: 'b11',
    name: 'War and Peace',
    cover: 'war-and-peace.jpeg',
    author: { id: 108, name: 'Leo Tolstoy' },
    releaseDate: '1869-01-01',
  },
  {
    id: 'b12',
    name: 'The Brothers Karamazov',
    cover: 'the-brothers-karamazov.jpeg',
    author: { id: 109, name: 'Fyodor Dostoevsky' },
    releaseDate: '1880-11-01',
  },
  {
    id: 'b13',
    name: 'Brave New World',
    cover: 'brave-new-world.jpeg',
    author: { id: 110, name: 'Aldous Huxley' },
    releaseDate: '1932-08-31',
  },
];
