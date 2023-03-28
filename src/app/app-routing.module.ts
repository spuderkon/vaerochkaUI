import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RegisterFlightComponent } from './registerFlight/register-flight/register-flight.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { RouteComponent } from './route/route.component';
import { TicketComponent } from './ticket/ticket/ticket.component';

const routes: Routes = [
  {path: 'ticket', component:TicketComponent},
  {path: 'registerFlight',component: RegisterFlightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
