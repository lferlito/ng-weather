import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { BoldDirective } from './directives/bold.directive';


@NgModule({
  declarations: [TabComponent,TabsComponent, BoldDirective],
  imports: [
    CommonModule
  ],
  exports:[TabComponent,TabsComponent, BoldDirective]
})
export class SharedModule { }
