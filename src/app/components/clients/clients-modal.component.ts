  // tslint:disable: no-string-literal
import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';

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

// redux
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, filter, take, map, mergeMap, switchMap } from 'rxjs/operators';
import { selectClientsClient, selectClientsEmpresas, selectClientsModeView } from './clients.selectors';
import { EmpresaGetAllAction, ClientResetAction } from './clients.actions';


export interface Form {
  id_cliente: number;
  firstname: string;
  lastname: string;
  country: string;
  telephone: string;
  email: string;
  empresa: {
      id_empresa: number,
      nombre: string,
  };
}

@Component({
  selector: 'app-clients-modal',
  templateUrl: './clients-modal.component.html',
  styleUrls: ['./clients-modal.component.css']
})
export class ClientsModalComponent implements OnInit, OnDestroy {

    formValueChanges$: Observable<Form>;
  listaEmpresas$: Observable<Empresa[]> = this.store.select(selectClientsEmpresas);
  modeView$: Observable<boolean> = this.store.select(selectClientsModeView);


  form = this.fb.group({
    id_cliente: [''],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    country: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    email:  ['', [Validators.required]],
    empresa: this.fb.group({
        id_empresa: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
    })
  });

  constructor(
              private fb: FormBuilder,
              private store: Store<AppState>,
              private clientesService: ClientsService,
              public dialogRef: MatDialogRef<ClientsModalComponent>,
              ) {}

  ngOnInit() {

    this.clientesService.loadEmpresas()
              .subscribe( (arrayEmpresas: Empresa[]) => {
                this.store.dispatch( new EmpresaGetAllAction(arrayEmpresas) );
              });

    this.formValueChanges$ = this.form.valueChanges.pipe(
      debounceTime(500)
    );

    this.store
      .pipe( select(selectClientsClient), take(5) )
      .subscribe(form => {
        if (!form ) {
          return;
        } else {
          this.form.patchValue({...form});
        }
      });

    this.modeView$.subscribe( (value: boolean) => {
      if (value) {
        this.form.disable();
      } else {
        return;
      }
    });

  }

  ngOnDestroy() {
    // para evitar una fuga de memoria, me desuscribo a los observables? cuando? como?
    console.log('MODAL, ME DESTRUÍ')
    this.store.dispatch( new ClientResetAction() );

  }

  guardarCambios() {


    // busca el nombre de la empresa
    const empresaNombre = this.form.get(['empresa', 'nombre']).value;
    // busca el id de la empresa seleccionada
    this.listaEmpresas$.pipe( map( (empresa: Empresa[]) => {
      empresa.find( (item: Empresa) => {
        if ( item['nombre'] === empresaNombre ) {
          return this.form.value.empresa.id_empresa = item['id_empresa'];
        } else { return; }
      });
    })).subscribe();

    // cierra el modal y envia el formulario si es valido
    // TODO cambiar esa validacion de id_cliente nulo
    if (this.form.valid || this.form.get('id_cliente').value === '' ) {
      this.dialogRef.close(this.form.value);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
