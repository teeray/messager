import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/home/homepage/homepage.component';
import { MessageControlComponent } from './views/messages/message-control/message-control.component';
import { UserComponent } from './views/users/user/user.component';

const routes: Routes = [
  {path:'', component:HomepageComponent},
  {path:'messages', component:MessageControlComponent},
  {path:'users', component:UserComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
