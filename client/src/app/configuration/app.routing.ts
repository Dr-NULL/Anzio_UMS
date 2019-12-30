import { Routes, RouterModule } from '@angular/router';
export { RouterModule };

// Importar componentes aquí
import { MainComponent } from '../components/pages/main/main.component';
import { SetupComponent } from '../components/pages/setup/setup.component';
import { LoginComponent } from '../components/pages/login/login.component';
import { SistAddComponent } from '../components/pages/sistema/sist-add/sist-add.component';
import { SistAltComponent } from '../components/pages/sistema/sist-alt/sist-alt.component';
import { ImportComponent } from '../components/pages/usuarios/import/import.component';

// Configurar rutas aquí
export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sistema/add', component: SistAddComponent },
  { path: 'sistema/alt', component: SistAltComponent },
  { path: 'usuarios/import', component: ImportComponent }
];
