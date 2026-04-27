import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { footer } from './layout/fotter/footer';
import { Navbar } from './layout/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('media-app');
}
