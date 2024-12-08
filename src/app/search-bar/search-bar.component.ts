import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() id: string | null = null

  @Output() filterByNameChange: EventEmitter<string> = new EventEmitter()

  async onNewOrderByNameValue(newValue: Event) {
    let element = (newValue.target as HTMLInputElement)
    this.filterByNameChange.emit(element.value)
  }

}
