import { Injectable } from "@angular/core";
import { LoginDTO } from "src/app/models/dto/LoginDTO";
import { PasswordResetDTO } from "src/app/models/dto/PasswordResetDTO";
import { ApiService } from "../api/api";
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    base:string = '';
    constructor(public api:ApiService){
        if(api.dom.isLocal){
            this.base = "https://localhost:5000/"
        }
    }
    checkLogin(callback:any){
        this.api.get(this.base + 'identity/api/v1/checklogin').subscribe(d => {
            callback(d)
        })
    }
    postRegistration(model:LoginDTO,callback:any){
        this.api.post(this.base + "identity/api/v1/registration", model).subscribe(d => {
            callback(d)
        }) 
    }
    postLogin(model:LoginDTO,callback:any){
        this.api.post(this.base + 'identity/api/v1/login', model).subscribe(d => {
            callback(d)
        })
    }
    getPasswordResetToken(username:string, callback:any){
        this.api.get(this.base + 'identity/api/v1/passwordreset/token/' + username).subscribe(d => {
            callback(d);
        })
    }
    postPasswordReset(reset:PasswordResetDTO, callback:any){
        this.api.post(this.base + 'identity/api/v1/passwordreset', reset).subscribe(d => {
            callback(d);
        })
    }
    postLogout(callback:any){
        this.api.post(this.base + 'identity/api/v1/logout', '').subscribe(d => {
            callback(d);
        })
    }
}