import { Routes } from '@angular/router';
import { AboutUs } from './feature/about-us/about-us';
import { Benefits } from './feature/benefits/benefits';
import { ContactUs } from './feature/contact-us/contact-us';
import { Features } from './feature/features/features';
import { RequestDemo } from './feature/request-demo/request-demo';
import { ThePlatform } from './feature/the-platform/the-platform';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'the-platform', component: ThePlatform },
  { path: 'features', component: Features },
  { path: 'benefits', component: Benefits },
  { path: 'request-demo', component: RequestDemo },
  { path: 'contact-us', component: ContactUs },
  { path: 'about-us', component: AboutUs },
];
