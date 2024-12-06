import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss'
})
export class PaginationBarComponent {
  @Input() pageNumber : number = 1
  @Input() totalPages : number = 1
  minPage : number = 1

  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter()

  nextPage() {
    if(this.pageNumber + 1 >= this.totalPages) {
      return
    }
    this.pageNumberChange.emit(this.pageNumber + 1)
  }

  previousPage() {
    if(this.pageNumber == 0) {
      return
    }
    this.pageNumberChange.emit(this.pageNumber - 1)
  }
}
