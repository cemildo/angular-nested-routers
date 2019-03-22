import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoContainerComponent } from './components/info-container/info-container.component';
import { InfoServiceService } from './services/info-service.service';

@NgModule({
  declarations: [
    AppComponent,
    InfoContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [InfoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
