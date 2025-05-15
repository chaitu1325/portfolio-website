import { Component } from '@angular/core';
import { AnalyticsToggleComponent } from '../analytics-toggle/analytics-toggle.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AnalyticsToggleComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
