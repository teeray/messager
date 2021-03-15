import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/datas/auths/AuthData';
import { UserData } from 'src/app/datas/users/UserData';
import { LoginDTO } from 'src/app/models/dto/LoginDTO';
import { PasswordResetDTO } from 'src/app/models/dto/PasswordResetDTO';
import { User } from 'src/app/models/users/User';
import { Navigation } from 'src/app/utilities/helpers/navigation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login:LoginDTO = new LoginDTO();
  isResetError:boolean = false;
  isRegError:boolean = false;
  isNoName:boolean = false;
  name:string = '';
  constructor(public auth:AuthData, public user:UserData, public nav:Navigation) { }

  ngOnInit(): void {
    this.resetValues();
    if(!this.auth.isLoggedOut){
      this.auth.checkLogin(f => {
        if(f){
          if(!this.nav.isMessages){
            this.nav.messagePress();
          }
        } else {
          if(!this.nav.isHome){
            this.nav.homePress();
          }
        }
      });
    }
  }
  postLogin(){
    this.isResetError = false;
    this.isRegError = false;
    if(!this.login.userName || !this.login.password){
      this.isRegError = true;
      return;
    }
    this.auth.login(this.login,(f:boolean)=>{
      if(f){
        this.resetValues();
        this.nav.messagePress();
      }
    })
  }
  postRegistration(){
    this.isResetError = false;
    this.isRegError = false;
    if(!this.login.userName || !this.login.password){
      this.isRegError = true;
      return;
    }
    if(!this.name){
      this.isNoName = true;
      return;
    }
    this.auth.registration(this.login,(f:boolean)=>{
      if(f){
        this.user.user = new User();
        this.user.user.name = this.name;
        this.user.user.authID = this.auth.auth.id;
        this.user.postUser();
        this.resetValues();
        this.nav.messagePress();
      }
    })
  }
  reset(){
    this.isRegError = false;
    this.isResetError = false;
    if(!this.login.userName){
      this.isResetError = true;
      return;
    }
    this.auth.getPasswordReset(this.login.userName)    
  }
  postReset(){
    this.isResetError = false;
    if(!this.login.userName || !this.login.password){
      this.isResetError = true;
      return;
    } 
    var reset = new PasswordResetDTO();
    reset.userName = this.login.userName;
    reset.password = this.login.password;
    reset.code = this.auth.passwordReset;
    this.auth.postPasswordReset(reset,(f:boolean) =>{
      if(f){
        this.resetValues();
        this.nav.messagePress();
      }
    })
  }
  resetValues(){
    this.isResetError = false;
    this.isRegError = false;
    this.login = new LoginDTO();
    this.auth.passwordReset = '';
  }
}
