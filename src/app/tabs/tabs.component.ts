import { AfterContentInit, Component, ContentChildren, EventEmitter, Output } from '@angular/core';
import { TabComponent } from 'app/tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent  implements AfterContentInit {

  @ContentChildren(TabComponent) tabs;

  @Output() tabRemoved: EventEmitter<string> = new EventEmitter<string>();

  private lastTabsCount: number = 0;

  ngAfterContentInit(): void {
    setTimeout(() => { // wait for content projection ends
      if(this.tabs){
        this.selectTab(this.tabs.first); // Select the first tab by default
        this.lastTabsCount = this.tabs.length;
      }
    })

    this.tabs.changes.subscribe(() => {
      setTimeout(() => {
        if(this.tabs.length > this.lastTabsCount){ //addition detected
          this.lastTabsCount++;
          this.selectTab(this.tabs.last);
        }
      });
    })
  }

  selectTab(tab: TabComponent){
    this.tabs.forEach((t) => (t.isActive = false));
    if(tab){
      tab.isActive = true;
    }
  }

  removeTab(tab: TabComponent){
    this.tabs = this.tabs.filter((t) => t.tab.tabId !== tab.tab.tabId);
    this.selectTab(this.tabs[0]);
    this.lastTabsCount--;
    this.tabRemoved.emit(tab.tab.tabId);
  }

}


