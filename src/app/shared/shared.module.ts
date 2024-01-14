import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';


@NgModule({
  declarations: [TabComponent,TabsComponent],
  imports: [
    CommonModule
  ],
  exports:[TabComponent,TabsComponent]
})
export class SharedModule { }
