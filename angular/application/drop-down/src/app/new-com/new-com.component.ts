import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-new-com',
  templateUrl: './new-com.component.html',
  styleUrls: ['./new-com.component.css']
})
export class NewComComponent {
  /*@Output() optionSelected = new EventEmitter<string>();
  dropdownOptions: string[] = ['Apple', 'Mango','grapes'];
  //extra
  selectedOption: string;
  isDropdownOpen: boolean = false;

/*selectOption(event: any) {
  this.optionSelected.emit(event);
}*/



/*toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

selectOption(option: string) {
  this.selectedOption = option;
  this.isDropdownOpen = false;
}*/
  @Input() options: string[];

  @Output() optionSelected = new EventEmitter<string>();

  selectOption(option: string) {
    this.optionSelected.emit(option);
  }

}
