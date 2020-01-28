import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Internationalization (i18n) */
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

/** RouterModule - HttpClientModule - FormsModule - ReactiveFormsModule */
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Angular Material */
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

/** Components */
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectiveComponent } from './pages/directive/directive.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { PaginationComponent } from './components/pagination/pagination.component';

registerLocaleData(localeFr, 'fr'); /** Global configuration */

const appRoutes: Routes = [
  { path: 'directive', component: DirectiveComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/:page', component: ClientsComponent },
  { path: 'add-client', component: AddClientComponent },
  { path: 'add-client/:id', component: AddClientComponent },
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    ClientsComponent,
    PageNotFoundComponent,
    AddClientComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
