import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { PlantillasService } from '../services/plantillas.service';
import { Plantilla } from '../model/plantilla';
import { GastoValor } from '../model/gastoValor';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent {
  @ViewChild('NombrePresupuesto', {static: false}) nombrePresupuesto: any;
  // VALIDACIONES HTML
  nombre = new FormControl('', Validators.required);
  saldo = new FormControl('', Validators.required);
  gasto = new FormControl('', Validators.required);
  valor = new FormControl('', Validators.required);
  // Variables
  namePresupuesto: any;
  saldoTotal: number;
  saldoRestante: number;
  valorAnterior: any;
  valorParcial: any;
  colorFondo: any;
  // ARRAYS DEL PROYECTO
  gastoValor: GastoValor[] = [];
  plantillaCompleta: Plantilla[] = [];
  presupuestoCompleto = {};

  constructor(private toastrSvc: ToastrService, private plantillaService: PlantillasService, private router: Router) {
    this.saldoTotal = 0;
    this.saldoRestante = 0;
    this.valorParcial = 0;
  }
  // MÉTODOS
  inputSaldoTotal(value: any) {
    this.saldoTotal = +value;
    this.saldoRestante = this.saldoTotal;
    this.saldoRestante = this.saldoRestante - this.valorParcial;
    // CAMBIO DE COLOR SEGÚN EL VALOR DEL SALDO RESTANTE CON RESPECTO AL SALDO TOTAL
    if (
      this.saldoRestante <= this.saldoTotal &&
      this.saldoRestante > this.saldoTotal / 2
    ) {
      this.colorFondo = 'table-success';
    }
    if (this.saldoRestante <= this.saldoTotal / 2) {
      this.colorFondo = 'table-info';
    }
    if (this.saldoRestante <= this.saldoTotal / 4) {
      this.colorFondo = 'table-warning';
    }
    if (this.saldoRestante <= this.saldoTotal / 8) {
      this.colorFondo = 'table-danger';
    }
  }
  cargarValorGasto(value: any) {
    this.valorAnterior = +value;
  }
  nuevoGasto(gasto: any, value: any) {
    this.gastoValor.push({
      gasto: gasto,
      valor: value,
    });
    this.gasto.setValue('');
    this.valor.setValue('');
    this.saldoRestante = this.saldoRestante - value;
    this.valorParcial = this.valorParcial + value;
    // CAMBIO DE COLOR SEGÚN EL VALOR DEL SALDO RESTANTE CON RESPECTO AL SALDO TOTAL
    if (this.saldoRestante <= this.saldoTotal / 2) {
      this.colorFondo = 'table-info';
    }
    if (this.saldoRestante <= this.saldoTotal / 4) {
      this.colorFondo = 'table-warning';
    }
    if (this.saldoRestante <= this.saldoTotal / 8) {
      this.colorFondo = 'table-danger';
    }
  }
  editarGasto(editado: any) {
    let edicion = +editado;
    // SALDO RESTANTE
    this.saldoRestante = this.saldoRestante + this.valorAnterior;
    this.saldoRestante = this.saldoRestante - edicion;
    // VALOR PARCIAL
    this.valorParcial = this.valorParcial - this.valorAnterior;
    this.valorParcial = this.valorParcial + edicion;
    // ASIGNO UN NUEVO VALOR A "VALOR ANTERIOR"
    this.valorAnterior = edicion;
    // CAMBIO DE COLOR SEGÚN EL VALOR DEL SALDO RESTANTE CON RESPECTO AL SALDO TOTAL
    if (this.saldoRestante <= this.saldoTotal && this.saldoRestante > this.saldoTotal /2) {
      this.colorFondo = 'table-success';
    }
    if (this.saldoRestante <= this.saldoTotal / 2) {
      this.colorFondo = 'table-info';
    }
    if (this.saldoRestante <= this.saldoTotal / 4) {
      this.colorFondo = 'table-warning';
    }
    if (this.saldoRestante <= this.saldoTotal / 8) {
      this.colorFondo = 'table-danger';
    }
  }
  eliminarGasto(trElement: any, value: any, index: number) {
    this.gastoValor.splice(index, 1);
    let tr = trElement;
    let valorEliminar = +value;
    this.saldoRestante = this.saldoRestante + valorEliminar;
    this.valorParcial = this.valorParcial - valorEliminar;
    tr.style.display = 'none';
    // CAMBIO DE COLOR SEGÚN EL VALOR DEL SALDO RESTANTE CON RESPECTO AL SALDO TOTAL
    if (this.saldoRestante <= this.saldoTotal && this.saldoRestante > this.saldoTotal /2) {
      this.colorFondo = 'table-success';
    }
    if (this.saldoRestante <= (this.saldoTotal / 2)) {
      this.colorFondo = 'table-info';
    }
    if (this.saldoRestante <= this.saldoTotal / 4) {
      this.colorFondo = 'table-warning';
    }
    if (this.saldoRestante <= this.saldoTotal / 8) {
      this.colorFondo = 'table-danger';
    }
  }
  // GUARDAR PRESUPUESTO EN IMAGEN, PDF Y PLANTILLA.
  downloadImagen() {
    const contenedor = document.getElementById('contenedor');
    html2canvas(contenedor)
      .then((canvas) => {
        this.namePresupuesto = this.nombrePresupuesto.nativeElement;
        let enlace = document.createElement('a');
        enlace.download = `Presupuesto: ${this.namePresupuesto.value}`;
        enlace.href = canvas.toDataURL();
        enlace.click();
    });
  }
  public downloadPDF() {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: null,
      imageTimeout: 0,
      scale: 1,
      useCORS: true,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        const bufferX = 0;
        const bufferY = 0;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        this.namePresupuesto = this.nombrePresupuesto.nativeElement;
        docResult.save(`Presupuesto: ${this.namePresupuesto.value}.pdf`);
      });
  }
  guardarPlantilla(namePresupuesto: any) {
    this.plantillaCompleta.push({
      nombrePresupuesto: namePresupuesto,
      saldoTotal: this.saldoTotal,
      saldoRestante: this.saldoRestante,
      valorParcial: this.valorParcial,
      gastoValor: this.gastoValor
    });
    this.presupuestoCompleto = this.plantillaCompleta[0];
    console.log(this.presupuestoCompleto);


    this.plantillaService.setPresupuesto(this.presupuestoCompleto)
    .subscribe(
      (res): void =>{
      },
      err => console.log(err))
      this.router.navigate(['home']);
      this.toastrSvc.success('Plantilla Creada');
    }
}
