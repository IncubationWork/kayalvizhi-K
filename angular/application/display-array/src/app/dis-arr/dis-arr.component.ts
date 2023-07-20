import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dis-arr',
  templateUrl: './dis-arr.component.html',
  styleUrls: ['./dis-arr.component.css']
})
export class DisArrComponent {
  @Input() selectedArray: string[] = [];
}
                   