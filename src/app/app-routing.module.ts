import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoContainerComponent } from './components/info-container/info-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/swiss', pathMatch: 'full'},
  {
    path: 'swiss',
    component: InfoContainerComponent,
    children: [
      {
        path: ':kanton',
        component: InfoContainerComponent,
        data: { place: 'city' },
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: ':city',
            component: InfoContainerComponent,
            data: { place: 'street' }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
