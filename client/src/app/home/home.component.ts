import { Component, OnInit } from '@angular/core';
import { PlantillasService } from "../services/plantillas.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public plantillaService:PlantillasService) { }

  ngOnInit(): void {
    this.plantillaService.getPresupuestos().subscribe((data: any) => {
      this.plantillaService.presupuesto = data;
      console.log(data);
    });
  }
}
