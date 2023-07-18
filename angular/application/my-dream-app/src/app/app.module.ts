import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { ServerComponent } from "./server/server.component";

import { AppComponent } from './app.component';
import { ServersComponent } from './servers/servers.component';
import { AssOneComponent } from './ass-one/ass-one.component';
import { AssTwoComponent } from './ass-two/ass-two.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    AssOneComponent,
    AssTwoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
