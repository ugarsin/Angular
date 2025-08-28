import { Routes } from '@angular/router';
import { Authors } from './authors/authors';
import { Books } from './books/index/books';
import { CreateBook } from './books/create/create';
import { EditBook } from './books/edit/edit';
import { DetailsBook } from './books/details/details';

export const routes: Routes = [
    {path: 'books', component: Books},
    {path: 'createbook', component: CreateBook},
    {path: 'editbook/:id', component: EditBook},
    {path: 'detailsbook/:id', component: DetailsBook},
    {path: 'authors', component: Authors}
];
