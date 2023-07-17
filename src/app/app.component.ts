import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionItemsStagesComponent } from './action-items/components/action-items-stages/action-items-stages.component';
import { ActionItemsSummaryComponent } from './action-items/components/action-items-summary/action-items-summary.component';

@Component({
  standalone: true,
  imports: [ActionItemsStagesComponent, ActionItemsSummaryComponent],
  selector: 'fi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
