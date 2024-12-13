export interface BookAdmin {
    id: number;
    name: string;
    cover: string;
    releaseDate: string;
    author: AuthorBook;
}

export interface AuthorBook {
    id: number;
    name: string;
}