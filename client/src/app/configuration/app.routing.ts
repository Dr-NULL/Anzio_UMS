import { Routes, RouterModule } from '@angular/router';
export { RouterModule };

// Importar componentes aquí
import { MainComponent } from '../components/pages/main/main.component';
import { SetupComponent } from '../components/pages/setup/setup.component';
import { LoginComponent } from '../components/pages/login/login.component';
import { AddComponent } from '../components/pages/sistema/add/add.component';

// Configurar rutas aquí
export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sistema/add', component: AddComponent }
];
