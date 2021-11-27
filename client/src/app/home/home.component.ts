import { Component, OnInit } from '@angular/core';
import { PlantillasService } from "../services/plantillas.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  deferredPrompt: any;

  constructor(public plantillaService:PlantillasService) { }

  ngOnInit(): void {
    this.initPWA();
    this.plantillaService.getPresupuestos().subscribe((data: any) => {
      this.plantillaService.presupuesto = data;
      console.log(data);
    });
  }

  initPWA(){
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  }

  installPWA(){
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoise.then((choiceResult: any) => {
      if(choiceResult.outcome === 'accepted'){
        console.log("User accepted the A2HS prompt");
      }
      this.deferredPrompt = null;
    });
  }
}
