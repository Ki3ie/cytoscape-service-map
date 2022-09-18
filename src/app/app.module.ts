import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CytoscapeComponent } from './cytoscape/cytoscape.component';

@NgModule({
  declarations: [AppComponent, CytoscapeComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
