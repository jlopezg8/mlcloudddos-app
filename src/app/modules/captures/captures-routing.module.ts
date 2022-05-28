import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CapturesComponent } from './components/captures/captures.component';

const routes: Routes = [
  { path: '', component: CapturesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturesRoutingModule { }
