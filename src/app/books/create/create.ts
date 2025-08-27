import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book-service';
import { FormsModule, NgForm } from '@angular/forms';
import { BookWithAuthors } from '../../models/books';
import { ToastService } from '../../services/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class CreateBook {
  protected bookService = inject(BookService);
  protected BookEdit = {id: 0, title: '', names: []}
  protected SelectedAuthorIds: number[] = [];
  protected toastService = inject(ToastService);
  private router = inject(Router);
  
  ngOnInit() {
    this.bookService.getAllAuthors();
    this.SelectedAuthorIds = [];
  }

  save(BookEditingForm: any) {
    if (BookEditingForm.invalid) {
      this.toastService.error("Error");
      return;      
    }
    this.bookService.postBookAndSelectedAuthorIds(this.BookEdit, this.SelectedAuthorIds);
    this.redirectToPage();
  }

  redirectToPage() {
    this.router.navigateByUrl("/books");
  }
}
