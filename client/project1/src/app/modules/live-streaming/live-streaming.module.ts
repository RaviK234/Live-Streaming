import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StreamnIOComponent } from './streamn-io/streamn-io.component';
import { LiveRoutingModule } from './live-routing.module';



@NgModule({
  declarations: [StreamnIOComponent],
  imports: [
    CommonModule,
    LiveRoutingModule,
    FormsModule
  ]
})
export class LiveStreamingModule { }
