import { Routes } from '@angular/router';
import { ThePlatform } from './feature/1-the-platform/the-platform';
import { Features } from './feature/2-features/features';
import { Benefits } from './feature/3-benefits/benefits';
import { RequestDemo } from './feature/4-request-demo/request-demo';
import { ContactUs } from './feature/5-contact-us/contact-us';
import { AboutUs } from './feature/6-about-us/about-us';
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
