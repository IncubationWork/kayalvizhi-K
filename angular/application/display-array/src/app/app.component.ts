import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arr: string[] = ['Apple', 'Orange', 'Banana'];

  selectedElements: string[] = [];

  toggleCheckbox(element: string) {
    const index = this.selectedElements.indexOf(element);
    if (index === -1) {
      this.selectedElements.push(element);
    } else {
      this.selectedElements.splice(index, 1);
    }
  }

  isChecked(element: string): boolean {
    return this.selectedElements.includes(element);
  }
}



