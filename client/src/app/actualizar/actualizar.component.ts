import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { PlantillasService } from '../services/plantillas.service';
import { GastoValor } from '../model/gastoValor';
import { Plantilla } from '../model/plantilla';
import { LoadingService } from './../services/loading.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css'],
})
export class ActualizarComponent implements OnInit{
  @ViewChild('valorEdicion', {static: false}) valorEdicion: any;
  // VALIDACIONES HTML
  nombre = new FormControl('', Validators.required);
  saldo = new FormControl('', Validators.required);
  gasto = new FormControl('', Validators.required);
  valor = new FormControl('', Validators.required);
  // Variables
  saldoTotal: number;
  saldoRestante: number;
  valorAnterior: any;
  valorParcial: any;
  colorFondo: any;
  recarga: any;

  gastoValor: GastoValor[] = [];
  plantillaCompleta$: Plantilla[] = [];
  presupuestoCompleto = {};

  constructor(private toastrSvc: ToastrService, private rutaActiva: ActivatedRoute, public plantillaService: PlantillasService, private router: Router, private loadingService: LoadingService) {
    this.saldoTotal = 0;
    this.saldoRestante = 0;
    this.valorParcial = 0;
  }
  ngOnInit(){
    this.loadingService.cargarSpinner();
    this.internetLento(true);
    const id = this.rutaActiva.snapshot.params['id'];
    this.plantillaService.getPresupuesto(id).subscribe(
      (res) => {
        this.plantillaCompleta$.push({
          plantilla: res
        })
        this.initForm(this.plantillaCompleta$);
        this.loadingService.cerrarSpinner();
        clearTimeout(this.recarga);
      },
      (err) => {
        this.loadingService.cerrarSpinner();
        clearTimeout(this.recarga);
      }
    );
  }
  // MÉTODOS
  private initForm = (_data: any): void => {
    // Inicializo los inputs y los valores de la tabla.
    this.nombre = new FormControl(_data[0].plantilla.nombrePresupuesto, Validators.required);
    this.saldo = new FormControl(_data[0].plantilla.saldoTotal, Validators.required);
    this.gastoValor = _data[0].plantilla.gastoValor;
    this.saldoTotal = _data[0].plantilla.saldoTotal;
    this.saldoRestante = _data[0].plantilla.saldoRestante;
    this.valorParcial = _data[0].plantilla.valorParcial;
    // COLORES
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

  editarGasto(editado: any, gasto: any, index: number) {
    let edicion = +editado;
    this.saldoRestante = this.saldoRestante + this.valorAnterior;
    this.saldoRestante = this.saldoRestante - edicion;
    this.valorParcial = this.valorParcial - this.valorAnterior;
    this.valorParcial = this.valorParcial + edicion;
    this.valorAnterior = edicion;
    this.gastoValor[index] = {
      gasto: gasto,
      valor: edicion
    }
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
    // setTimeout((): void => {
    //   const valorEdicion = this.valorEdicion.nativeElement;
    //   valorEdicion.focus();
    // }, 1);
  }
  eliminarGasto(trElement: any, value: any, index: number) {
    console.log("Este era gastoValor: ", this.gastoValor);
    this.gastoValor.splice(index, 1);
    console.log("Este es ahora gastoValor: ", this.gastoValor);
    let tr = trElement;
    let valorEliminar = +value;
    this.saldoRestante = this.saldoRestante + valorEliminar;
    this.valorParcial = this.valorParcial - valorEliminar;
    tr.style.display = 'none';
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

  // GUARDAR PRESUPUESTO

  downloadImagen() {
    let contenido: any;
    const contenedor = document.getElementById('contenedor');
    contenido = contenedor;
    html2canvas(contenido)
      .then((canvas) => {
        let enlace = document.createElement('a');
        enlace.download = 'Captura de página web - Parzibyte.me.png';
        // Convertir la imagen a Base64
        enlace.href = canvas.toDataURL();
        // Hacer click en él
        enlace.click();
      });
  }

  public downloadPDF() {
    const botonAdd: any = document.getElementById('agregar');

    // Extraemos el ELEMENTO
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
        // Add image Canvas to PDF
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
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
  }
  actualizarPlantilla(namePresupuesto: any) {
    this.loadingService.cargarSpinner();
    this.plantillaCompleta$.push({
      nombrePresupuesto: namePresupuesto,
      saldoTotal: this.saldoTotal,
      saldoRestante: this.saldoRestante,
      valorParcial: this.valorParcial,
      gastoValor: this.gastoValor,
    });

    console.log(this.gastoValor);

    this.presupuestoCompleto = this.plantillaCompleta$[1];

    console.log(this.presupuestoCompleto);

    const id = this.rutaActiva.snapshot.params['id'];
    this.plantillaService.updatePresupuesto(id, this.presupuestoCompleto).subscribe(
      (res) => {
        console.log(res);
        this.loadingService.cerrarSpinner();
      },
      (err) => {
        console.log(err);
        this.loadingService.cerrarSpinner();
      })
      this.loadingService.cerrarSpinner();
      this.router.navigate(['home']);
      this.toastrSvc.success('Plantilla Actualizada');
      this.plantillaService.getPresupuestos();
  }

  eliminarPlantilla(){
    this.loadingService.cargarSpinner();
    const id = this.rutaActiva.snapshot.params['id'];
    this.plantillaService.deletePresupuesto(id).subscribe(
      (res) => {
        console.log(res);
        this.loadingService.cerrarSpinner();
      },
      (err) => {
        console.log(err);
        this.loadingService.cerrarSpinner();
      })
      this.router.navigate(['home']);
      this.plantillaService.getPresupuestos();
      this.toastrSvc.success('Plantilla Eliminada');
  }
  internetLento(valor: boolean){
    if(valor){
      this.recarga = setTimeout(() => {
        this.toastrSvc.info('Ten paciencia, tu internet es un poco lento ...', "PACIENCIA", {timeOut: 10000});
      }, 7000);
      return this.recarga;
    } else{
      return false;
    }
  }
}
