import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Author, Book, BookWithAuthors } from '../models/books';
import { ToastService } from './toast-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private toastService = inject(ToastService);
  protected http = inject(HttpClient);
  Books = signal<BookWithAuthors[] | []>([]);
  BookForEditing = signal<BookWithAuthors | {id: 0, title: '', names: []}>({id: 0, title: '', names: []});
  AllAuthors = signal<Author[] | []>([]);
  SelectedAuthorIds = signal<number[]>([]);

  getAllBooksWithAuthors() {
    this.http.get<BookWithAuthors[]>('http://localhost:5124/api/books').subscribe({
      next: response => {
        this.Books.set(response);
      },
      error: error => console.log(error.error)
    });
  }

  getBookWithAuthorsById(id: number): Observable<BookWithAuthors> {
    return this.http.get<BookWithAuthors>(`http://localhost:5124/api/books/${id}`);
  }

  getAllAuthors() {
      this.http.get<Author[]>('http://localhost:5124/api/books/get-all-authors').subscribe({
      next: response => {
        this.AllAuthors.set(response);
      },
      error: error => console.log(error.error)
    });
  }

  getSelectedAuthorIds(id: number) {
    this.http.get<number[]>(`http://localhost:5124/api/books/selectedauthorids/${id}`).subscribe({
      next: response => {
        this.SelectedAuthorIds.set(response);
      },
      error: error => console.log(error.error)
    });
  }

  postBookAndSelectedAuthorIds(book: Book, SelectedAuthorIds: number[])
  {
      const NewBook = {
        title: book.title,
        authors: SelectedAuthorIds
      };
      this.http.post('http://localhost:5124/api/books/new-book-with-authors', NewBook).subscribe({
        next: response => {
          this.toastService.success('Book saved ' + response),
          this.getAllBooksWithAuthors();
        },
        error: err => this.toastService.error('Error saving book ', err.error)
      });
  }
}
