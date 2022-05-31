import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';
import { CapturesRoutingModule } from './captures-routing.module';
import { CapturesComponent } from './components/captures/captures.component';
import { CapturesService } from './services/captures.service';

@NgModule({
  declarations: [
    CapturesComponent,
  ],
  imports: [
    CommonModule,
    CapturesRoutingModule,
    AngularMaterialModule,
  ],
  providers: [
    CapturesService,
  ],
})
export class CapturesModule { }
