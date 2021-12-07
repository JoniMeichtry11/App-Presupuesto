import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading$">
    <div class="lds-ripple"><div></div><div></div></div>
  </div>
  `,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{
  isLoading$: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.cerrarSpinner();
  }

  ngOnInit(): void{
    this.loadingService.getSpinner$().subscribe(spinner => {
      this.isLoading$ = spinner;
    })
  }
}
