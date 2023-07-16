import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { PlantillasService } from "../services/plantillas.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  deferredPrompt: any;

  constructor(public plantillaService:PlantillasService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    // this.loadingService.cargarSpinner();
    // this.initPWA();
    // this.plantillaService.getPresupuestos().subscribe(
    //   (data: any) => {
    //     this.plantillaService.presupuesto = data;
    //     this.loadingService.cerrarSpinner();
    //     console.log(data);
    //   }),
    //   (err: any) => {
    //     this.loadingService.cerrarSpinner();
    //     console.log(err);
    //   };
    // setTimeout(() => {
    //   this.plantillaService.getPresupuestos().subscribe(
    //     (data: any) => {
    //       this.plantillaService.presupuesto = data;
    //       this.loadingService.cerrarSpinner();
    //       console.log(data);
    //     }),
    //     (err: any) => {
    //       this.loadingService.cerrarSpinner();
    //       console.log(err);
    //     };
    // }, 2000);
    // setTimeout(() => {
    //   this.plantillaService.getPresupuestos().subscribe(
    //     (data: any) => {
    //       this.plantillaService.presupuesto = data;
    //       this.loadingService.cerrarSpinner();
    //       console.log(data);
    //     }),
    //     (err: any) => {
    //       this.loadingService.cerrarSpinner();
    //       console.log(err);
    //     };
    // }, 5000);
    // setTimeout(() => {
    //   this.plantillaService.getPresupuestos().subscribe(
    //     (data: any) => {
    //       this.plantillaService.presupuesto = data;
    //       this.loadingService.cerrarSpinner();
    //       console.log(data);
    //     }),
    //     (err: any) => {
    //       this.loadingService.cerrarSpinner();
    //       console.log(err);
    //     };
    // }, 10000);

    window.addEventListener('appinstalled', async function(e){
      let buttonInstaller: any;
      buttonInstaller = document.getElementById('pwaInstaller');
      buttonInstaller.style.display = "none";
    })
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
      else{
        console.log("No quiso instalar la APP :(");
      }
      this.deferredPrompt = null;
    });
  }
}
