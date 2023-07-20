import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
/*  selectedOption: string = '';

  handleOptionSelected(option: string) {
    this.selectedOption = option;
  }*/

  selectedOption: string;
  dropdownOptions: string[] = ['Apple', 'Mango','grapes'];

  handleOptionSelected(option: string) {
    this.selectedOption = option;
  }


}
