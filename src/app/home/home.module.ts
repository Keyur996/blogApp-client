import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, HomeRoutingModule],
})
export class HomeModule {}
