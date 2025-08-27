export type Book = {
    id: number;
    title: string;
}

export type Author = {
    id: number;
    name: string;
}

export type BookWithAuthors = {
    id: number;
    title: string;
    names: string[];
}
