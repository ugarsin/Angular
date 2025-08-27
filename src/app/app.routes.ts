import { Routes } from '@angular/router';
import { Books } from './books/index/books';
import { CreateBook } from './books/create/create';
import { Authors } from './authors/authors';
import { EditBook } from './books/edit/edit';

export const routes: Routes = [
    {path: 'books', component: Books},
    {path: 'createbook', component: CreateBook},
    {path: 'editbook/:id', component: EditBook},
    {path: 'authors', component: Authors}
];
