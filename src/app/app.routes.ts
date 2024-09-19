import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { StatsComponent } from './pages/stats/stats.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './Guard/auth.guard';
import { ProductsComponent } from './pages/products/products.component';

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
      // Add other protected routes here
      // {
      //   path: 'share/:id',
      //   component: SharedComponent,
      //   canActivate: [authGuard]
      // }
    ]
  }
];
