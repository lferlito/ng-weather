import { Component, Input } from '@angular/core';
import { Tab } from 'app/shared/models/tab';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {

  @Input() tab: Tab | undefined;
  @Input() isActive = false;

}
