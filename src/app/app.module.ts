import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from '@angular/material/tabs';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { RouteComponent, routeDialog } from './route/route.component';
import { MainComponent } from './main/main.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { RegistrationComponent, aircraftInfoDialog, paymentDialog } from './registration/registration/registration.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID } from '@angular/core';
import { TicketComponent } from './ticket/ticket/ticket.component';
import { RegisterFlightComponent } from './registerFlight/register-flight/register-flight.component';


registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
    MainComponent,
    routeDialog,
    RegistrationComponent,
    aircraftInfoDialog,
    paymentDialog,
    TicketComponent,
    RegisterFlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSliderModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  providers: [SharedService, {provide: LOCALE_ID, useValue: 'ru'}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
