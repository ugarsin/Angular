import { Component, effect, ElementRef, inject } from '@angular/core';
import { BookService } from '../../services/book-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, BookWithAuthors } from '../../models/books';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditBook {
   @ViewChild('f') form!: NgForm;
   @ViewChild('title') input!: ElementRef;

  protected bookService = inject(BookService);;
  private router = inject(Router);
  protected BookEdit: BookWithAuthors = {id: 0, title: '', names: []};
  AllAuthors: Author[] = [];
  title: string = "";
  protected counter: number = 0;
  
  constructor(private route: ActivatedRoute) {
    // effect(() => {
    //   this.title = this.bookService.BookForEditing().title;
    // });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookWithAuthorsById(id).subscribe(book => {
      this.BookEdit = book;
      const inputTitle = document.getElementById("title")! as HTMLInputElement;
      inputTitle.value = book.title;
      this.bookService.getSelectedAuthorIds(id);
      this.bookService.getAllAuthors();
    });
  }
  
  save() {
    //this.form.get('title')?.setValue("abcdefg");
    // this.input.nativeElement.setValue("abc");
    console.log("title2="+this.bookService.BookForEditing().title);
    const test = this.bookService.BookForEditing().title;
    this.title = test;
    console.log("title1="+this.title);
    // this.title = "String(this.bookService.BookForEditing().title)";
    // this.title = "abc";
  }

  redirectToPage() {
    this.router.navigateByUrl('/books');
  }
}
