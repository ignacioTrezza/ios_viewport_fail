import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appViewport]'
})
export class ViewportDirective implements OnInit, OnDestroy {
  private resizeObserver: ResizeObserver | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Set initial viewport height
    this.updateViewportHeight();

    // Use ResizeObserver for more efficient monitoring of size changes
    this.resizeObserver = new ResizeObserver(() => {
      this.updateViewportHeight();
    });

    // Start observing the document.documentElement
    this.resizeObserver.observe(document.documentElement);

    // Also listen for orientation changes specifically
    window.addEventListener('orientationchange', this.handleOrientationChange);
  }

  ngOnDestroy(): void {
    // Clean up observers and listeners
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('orientationchange', this.handleOrientationChange);
  }

  private updateViewportHeight = (): void => {
    // Get the various viewport heights
    const dvh = window.innerHeight * 0.01;
    const svh = document.documentElement.clientHeight * 0.01;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--dvh', `${dvh}px`);
    document.documentElement.style.setProperty('--svh', `${svh}px`);
    
    // Apply the height to the element using dvh with vh fallback
    const element = this.elementRef.nativeElement;
    element.style.height = `100vh`; // Fallback
    element.style.height = `100svh`; // Modern browsers
    
    // For older browsers, use the calculated height
    if (!CSS.supports('height', '100svh')) {
      element.style.height = `${window.innerHeight}px`;
    }
  }

  private handleOrientationChange = (): void => {
    // Add a small delay to ensure new dimensions are available
    setTimeout(() => {
      this.updateViewportHeight();
    }, 100);
  }
}
