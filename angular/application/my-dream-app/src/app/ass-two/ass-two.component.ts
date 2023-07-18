import { Component } from '@angular/core';

@Component({
  selector: 'app-ass-two',
  templateUrl: './ass-two.component.html',
  styleUrls: ['./ass-two.component.css']
})
export class AssTwoComponent {
  showSecret = false;
  log: number[] = [];

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    this.log.push(this.log.length + 1);
  }
}
