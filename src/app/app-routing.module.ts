import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormBuilderComponent } from 'src/app/form-builder/form-builder.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: FormBuilderComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
