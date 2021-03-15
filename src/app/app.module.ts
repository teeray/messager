import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/logins/login/login.component';
import { HomepageComponent } from './views/home/homepage/homepage.component';
import { MessageControlComponent } from './views/messages/message-control/message-control.component';
import { MessageComponent } from './views/messages/message/message.component';
import { PoolComponent } from './views/messages/pool/pool.component';
import { UserComponent } from './views/users/user/user.component';
import { NavbarComponent } from './views/shared/navbar/navbar.component';
import { ContactComponent } from './views/users/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    MessageControlComponent,
    MessageComponent,
    PoolComponent,
    UserComponent,
    NavbarComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
