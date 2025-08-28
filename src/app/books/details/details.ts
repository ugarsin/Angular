
import { Component, inject } from '@angular/core';
import { Book, BookWithAuthors } from '../../models/books';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../services/book-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class DetailsBook {
  protected details: BookWithAuthors | null = null;
  private bookService = inject(BookService);
  
  constructor(private route: ActivatedRoute) {}

ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.bookService.getSelectedAuthorIds(Number(id));

    this.bookService.getBookWithAuthorsById(id).subscribe(book => {
      this.details = book;
    });
  }}
