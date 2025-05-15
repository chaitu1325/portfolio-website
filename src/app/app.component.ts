import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { environment } from '../environments/environment';
import { AnalyticsService } from './services/analytics.service';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-website';
  private analyticsService = inject(AnalyticsService);
  
  ngOnInit() {
    // The AnalyticsService is already initialized via dependency injection
    // No need to manually initialize Google Analytics here
  }
}
