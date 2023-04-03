import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { TerminologyTreeTestComponent } from './terminology-tree-test/terminology-tree-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'terminology', pathMatch: 'full' },
  { path: 'terminology', component: TerminologyTreeTestComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
