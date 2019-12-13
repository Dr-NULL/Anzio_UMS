import { Routes, RouterModule } from '@angular/router';
export { RouterModule };

// Importar componentes aquí
import { MainComponent } from '../components/pages/main/main.component';
import { SetupComponent } from '../components/pages/setup/setup.component';

// Configurar rutas aquí
export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'setup', component: SetupComponent }
];
