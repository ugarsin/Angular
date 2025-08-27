import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, BookWithAuthors } from '../../models/books';

@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditBook {
  protected bookService = inject(BookService);;
  private router = inject(Router);
  BookEdit: BookWithAuthors = {id: 0, title: '', names: []};
  AllAuthors: Author[] = [];

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    console.log(`ID=${id}`);
    console.log(this.bookService.SelectedAuthorIds());

    this.bookService.getBookWithAuthorsById(Number(id));
    this.bookService.getAllAuthors();
    this.bookService.getSelectedAuthorIds(Number(id));

    const book = this.bookService.BookForEditing();

    if (!book.id || !book) {
      console.log('error');
      this.redirectToPage();
    }

    this.BookEdit = book;
  }

  save() {

  }

  redirectToPage() {
    this.router.navigateByUrl('/books');
  }
}
