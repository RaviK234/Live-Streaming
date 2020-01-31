import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamnIOComponent } from './streamn-io/streamn-io.component';

const routes: Routes = [
  {
    path: '',
    component: StreamnIOComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LiveRoutingModule { }
