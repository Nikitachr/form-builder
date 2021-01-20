import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormBuilderComponent} from './form-builder/form-builder.component';
import { AuthGuard } from './shared/guards/auth.guard';



const routes: Routes = [
  { path: '', pathMatch: 'full', component: FormBuilderComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
