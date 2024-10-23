import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { StatsComponent } from './pages/stats/stats.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './Guard/auth.guard';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { ServicePageComponent } from './pages/service-page/service-page.component';

export const routes: Routes = [
  {    
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {    
    path: 'login',
    component: LoginComponent
  },
  {   
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'stats',
        component: StatsComponent,
        canActivate: [authGuard] 
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard] 
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard] 
      },
      {
        path: 'services',
        component: ServicesPageComponent,
        canActivate: [authGuard] 
      },
      {
        path: 'service/:id',
        component: ServicePageComponent,
        canActivate: [authGuard]
      }
    ]
  }
];
