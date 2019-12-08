import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componets
import { ClientsComponent } from './components/clients/clients.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent, canActivate: [ AuthGuard ]},
  { path: 'articles', component: ArticlesComponent, canActivate: [ AuthGuard ] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [ AuthGuard ] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
