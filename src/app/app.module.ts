import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// material
import { MaterialModule } from './material.module';
// datepicker
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


// components
import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsModalComponent } from './components/clients/clients-modal.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticlesModalComponent } from './components/articles/articles-modal.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionsModalComponent } from './components/transactions/transactions-modal.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';


@NgModule({
  entryComponents: [
    ClientsModalComponent,
    ArticlesModalComponent,
    TransactionsModalComponent
  ],
  declarations: [
    AppComponent,
    ClientsComponent,
    ArticlesComponent,
    TransactionsComponent,
    ClientsModalComponent,
    ArticlesModalComponent,
    TransactionsModalComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
