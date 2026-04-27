import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, Button, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  activeRoute = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.urlAfterRedirects;
      });
  }
  navLinks = [
    { label: 'The Platform', path: '/the-platform', exact: true },
    { label: 'Features', path: '/features' },
    { label: 'Benefits', path: '/benefits' },
    { label: 'Request a Demo', path: '/request-demo' },
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'About Us', path: '/about-us' },
  ];
}
