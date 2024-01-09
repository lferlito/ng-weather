import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { TabComponent } from 'app/tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit {


  @ContentChildren(TabComponent) tabComponents: QueryList<TabComponent> | undefined;

  @Output() tabRemoved: EventEmitter<string> = new EventEmitter<string>();

  tabs: TabComponent[] = [];


  ngAfterContentInit(): void {
    setTimeout(() => { // per evitare l'errore NG0100
      if (this.tabComponents) {
        this.tabs = this.tabComponents.toArray();
        this.selectTab(this.tabs[0]); // Select the first tab by default
      }
    })
  }

  selectTab(tab: TabComponent){
    this.tabs.forEach((t) => (t.isActive = false));
    if(tab){
      tab.isActive = true;
    }
  }

  removeTab(tab: TabComponent){
    this.tabRemoved.emit(tab.tab.tabId);
    this.selectTab(this.tabs[0]);
  }

}
