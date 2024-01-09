import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from 'app/tab/tab.component';
import { TabsComponent } from 'app/tabs/tabs.component';



@NgModule({
  declarations: [TabComponent,TabsComponent],
  imports: [
    CommonModule
  ],
  exports:[TabComponent,TabsComponent]
})
export class SharedModule { }
