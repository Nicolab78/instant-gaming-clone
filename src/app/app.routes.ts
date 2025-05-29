import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [

    {
        path: '',
        component: HomeComponent    
    },

    {   path: 'catalogue',
        component: CatalogueComponent},

    {
        path: 'catalogue/:id',
        loadComponent: () => import('./pages/game-detail/game-detail.component').then(m => m.GameDetailComponent)
    },
    

    {   path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]},
    
    {   path: 'login',
        component: LoginComponent,},

    {   path: 'wishlist',
         loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent) },

    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
    }

  

];
