import { Component } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
  standalone: false,
})
export class Page2Component {
  itemCount: number = 3;

  getItems(): number[] {
    return Array.from({ length: this.itemCount }, (_, i) => i + 1);
  }

  incrementCount(): void {
    if (this.itemCount < 100) {
      this.itemCount++;
    }
  }

  decrementCount(): void {
    if (this.itemCount > 1) {
      this.itemCount--;
    }
  }
}
