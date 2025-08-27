import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../services/book-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books {
  private http = inject(HttpClient);
  bookService = inject(BookService);
  private router = inject(Router);

  ngOnInit() {
    this.getBooks();
  }  

  getBooks() {
    this.bookService.getAllBooksWithAuthors();
  }

  createNew() {
    this.bookService.SelectedAuthorIds.set([]);
    this.router.navigateByUrl('/createbook');
  }

  editBook(id: number){
    this.router.navigateByUrl(`/editbook/${id}`);
  }
}
