import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'ios-viewport-fail';
  innerHeight: number = 0;
  outerHeight: number = 0;
  clientHeight: number = 0;

  ngOnInit() {
    this.updateHeights();
    // Update heights when window is resized
    window.addEventListener('resize', () => this.updateHeights());
  }

  ngOnDestroy() {
    // Clean up event listener
    window.removeEventListener('resize', () => this.updateHeights());
  }

  updateHeights() {
    this.innerHeight = window.innerHeight;
    this.outerHeight = window.outerHeight;
    this.clientHeight = document.documentElement.clientHeight;
  }
}
