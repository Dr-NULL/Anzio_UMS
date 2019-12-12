import { Routes, RouterModule } from '@angular/router';
export { RouterModule };

// Importar componentes aquí
import { SetupComponent } from './components/pages/setup/setup.component';

// Configurar rutas aquí
export const routes: Routes = [
  { path: 'setup', component: SetupComponent }
];
