
import { Component, inject } from '@angular/core';
import { Book, BookWithAuthors } from '../../models/books';
import { BookService } from '../../services/book-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class DetailsBook {
  protected details: BookWithAuthors | null = null;
  protected bookService = inject(BookService);
  protected Id: number = 0;
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {}

ngOnInit() {
    window.scrollTo(0, 0);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.Id = id;
    this.bookService.getSelectedAuthorIds(Number(id));
    this.bookService.getBookWithAuthorsById(id).subscribe(book => {
      this.details = book;
      this.bookService.bookWithAuthors.set(book);
    });
  }

  editBook() {
    this.router.navigate(['/editbook', this.Id])
  }
}
