import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css'],
})
export class ActualizarComponent {
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

  gastoValor: any[] = [];
  plantillaCompleta: any[] = [];

  constructor(private toastrSvc: ToastrService) {
    this.saldoTotal = 0;
    this.saldoRestante = 0;
    this.valorParcial = 0;
  }
  // MÉTODOS
  inputSaldoTotal(value: any) {
    this.saldoTotal = +value;
    this.saldoRestante = this.saldoTotal;
    this.saldoRestante = this.saldoRestante - this.valorParcial;
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
    console.log(this.valorParcial);
  }

  editarGasto(editado: any) {
    let edicion = +editado;
    this.saldoRestante = this.saldoRestante + this.valorAnterior;
    this.saldoRestante = this.saldoRestante - edicion;

    console.log('valor anterior', this.valorAnterior);
    console.log('primer valor', this.valorParcial);
    this.valorParcial = this.valorParcial - this.valorAnterior;
    console.log('segundo valor', this.valorParcial);
    this.valorParcial = this.valorParcial + edicion;
    console.log('tercer valor', this.valorParcial);

    this.valorAnterior = edicion;
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

  eliminarGasto(trElement: any, value: any) {
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
    const contenedor = document.getElementById('contenedor');
    // Nota: no necesitamos contenedor, pues vamos a descargarla
    html2canvas(contenedor) // Llamar a html2canvas y pasarle el elemento
      .then((canvas) => {
        // Cuando se resuelva la promesa traerá el canvas
        // Crear un elemento <a>
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
        const divHeight = document.getElementById('htmlData');

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

  guardarPlantilla(namePresupuesto: any) {
    this.plantillaCompleta.push({
      nombrePresupuesto: namePresupuesto,
      saldoTotal: this.saldoTotal,
      saldoRestante: this.saldoRestante,
      gastoValor: this.gastoValor,
    });
    console.log(this.plantillaCompleta);
  }
}
