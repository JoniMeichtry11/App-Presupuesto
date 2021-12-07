import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Servicio dedicado a el Spinner owo

export class LoadingService {
  public isLoading$: Subject<boolean>;

  constructor(){
    this.isLoading$ = new Subject();
  }

  cargarSpinner(){
    this.isLoading$.next(true);
  }

  cerrarSpinner(){
    this.isLoading$.next(false);
  }

  getSpinner$(): Observable<boolean>{
    return this.isLoading$.asObservable();
  }
}
