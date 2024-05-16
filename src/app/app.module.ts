import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StepsComponent } from './steps/steps.component';
import { HttpClientModule } from '@angular/common/http';
import { ChooseCollectionComponent } from './choose-collection/choose-collection.component';
import { SearchCollectionComponent } from './search-collection/search-collection.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { OpenCollectionComponent } from './open-collection/open-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCollectionComponent,
    ChooseCollectionComponent,
    StepsComponent,
    OpenCollectionComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
