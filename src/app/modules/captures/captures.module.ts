import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapturesRoutingModule } from './captures-routing.module';
import { MaterialDesignModule } from '../material-design.module';
import { CapturesComponent } from './components/captures/captures.component';


@NgModule({
  declarations: [
    CapturesComponent,
  ],
  imports: [
    CommonModule,
    CapturesRoutingModule,
    MaterialDesignModule,
  ]
})
export class CapturesModule { }
