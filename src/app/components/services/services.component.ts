import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Service {
  icon: string;
  title: string;
  description: string;
  plainTitle?: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: Service[] = [
    {
      icon: 'bi bi-person-video',
      title: '<span class="one-on-one">1:1</span> Technical Consultation',
      plainTitle: '1:1 Technical Consultation',
      description: 'Personalized technical guidance and problem-solving sessions for your Java/Spring projects. Get expert advice on architecture, design patterns, and best practices.'
    },
    {
      icon: 'bi bi-mortarboard',
      title: 'Mentorship Program',
      description: 'Structured mentorship to accelerate your Java development skills and career growth with regular sessions, personalized learning paths, and hands-on project guidance.'
    },
    {
      icon: 'bi bi-people',
      title: 'Mock Interviews',
      description: 'Comprehensive preparation for Java developer interviews including algorithm problem-solving, system design practice, and personalized feedback to help you succeed.'
    },
    {
      icon: 'bi bi-code-slash',
      title: 'Java Development',
      description: 'Expert Java development services including Spring Boot, Spring Framework, and Microservices architecture.'
    },
    {
      icon: 'bi bi-database',
      title: 'Database Design',
      description: 'Efficient database design and optimization for Oracle, MySQL, and PostgreSQL databases.'
    },
    {
      icon: 'bi bi-cloud',
      title: 'Cloud Solutions',
      description: 'AWS cloud solutions including deployment, management, and optimization of cloud resources.'
    },
    {
      icon: 'bi bi-gear',
      title: 'API Development',
      description: 'RESTful API development and integration services for seamless system connectivity.'
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Security Implementation',
      description: 'Implementation of security best practices and protocols for enterprise applications.'
    },
    {
      icon: 'bi bi-speedometer2',
      title: 'Performance Optimization',
      description: 'Application performance tuning and optimization for maximum efficiency.'
    }
  ];
}
