  // tslint:disable: no-string-literal
import { Component, OnInit, Inject, Input } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// form
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators, 
  FormArray} from '@angular/forms';

// custom errror handler
import { ErrorStateMatcher } from '@angular/material/core';

// components
import { Cliente, Empresa } from './clients.component';
import { ClientsService } from '../../providers/clients/clients.service';


// @TODO - create new class error handler
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-clients-modal',
  templateUrl: './clients-modal.component.html',
  styleUrls: ['./clients-modal.component.css']
})
export class ClientsModalComponent implements OnInit {

  listaEmpresas = [];
  id_empresa = new FormControl({ value: this.data.empresa.id_empresa, disabled: this.data['isView'] });
  nombre = new FormControl({ value: this.data.empresa.id_empresa, disabled: this.data['isView'] });
  viewMode = this.data['isView'];

  form = new FormGroup({
    firstname: new FormControl({ value: this.data['firstname'], disabled: this.data['isView'] }, Validators.required),
    lastname: new FormControl({ value: this.data['lastname'], disabled: this.data['isView']}, Validators.required),
    country: new FormControl({ value: this.data['country'], disabled: this.data['isView']}, Validators.required),
    telephone: new FormControl({ value: this.data['telephone'], disabled: this.data['isView']}, Validators.required),
    email:  new FormControl({ value: this.data['email'], disabled: this.data['isView']}, [ Validators.required, Validators.email]),
    empresa: new FormGroup({
        id_empresa: this.id_empresa,
        nombre: this.nombre,
    })
  });

  get user() {
    return this.form.get('firstname');
  }
  get idEmpresa() {
    return this.form.get('empresa.id_empresa');
  }

  matcher = new MyErrorStateMatcher();

  constructor(
              private clientesService: ClientsService,
              public dialogRef: MatDialogRef<ClientsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Cliente) {

                console.log(' data en el dialog component', data);
              }

  ngOnInit() {

    this.clientesService.getAllEmpresa()
        .subscribe( (empresa: any) => {
          console.log('[modal-component] empresa >>>', empresa);
          this.listaEmpresas = empresa;
        });
  }

  guardarCambios() {
    const id = this.data.id_cliente;
    this.form.value.id_cliente = id;

    const idEmpresaNew = this.idEmpresa.value;
    this.listaEmpresas.filter( item => {
      if (item.id_empresa === idEmpresaNew) {
        this.form.value.empresa.nombre = item.nombre;
      }
    });

    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
