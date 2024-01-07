import { Routes } from '@angular/router';

import { HomeComponent} from './../app/pages/home/home.component'
import { LabsComponent } from './../app/pages/labs/labs.component'

// Le dice a angular que componente debe renderizar en cada ruta.
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'labs',
        component: LabsComponent
    }
];

