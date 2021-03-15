import { Injectable } from "@angular/core";
import { IdentityUser } from "src/app/models/auths/IdentityUser";
import { LoginDTO } from "src/app/models/dto/LoginDTO";
import { PasswordResetDTO } from "src/app/models/dto/PasswordResetDTO";
import { LoginViewModel } from "src/app/models/viewModels/loginViewModel";
import { AuthService } from "src/app/services/auths/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthData {
    auth: IdentityUser;
    isLoggedOut: boolean = false;
    //not needed if this is sent in email
    passwordReset: string = ''
    get storedToken() {
        return localStorage.getItem('message_token');
    }
    constructor(public service: AuthService) { }
    checkLogin(callback: any) {
        if (this.storedToken) {
            this.service.api.bearer = this.storedToken;
            this.service.checkLogin(f => {
                if (f) {
                    var viewModel = new LoginViewModel(f);
                    this.auth = viewModel.user;
                    this.service.api.bearer = viewModel.token;
                    localStorage.setItem('message_token', viewModel.token);
                    callback(true)
                }
                callback(false)
            })
        }
    }
    login(model: LoginDTO, callback: any) {
        this.service.postLogin(model, (f: LoginViewModel) => {
            if (f) {
                var viewModel = new LoginViewModel(f);
                this.auth = viewModel.user;
                this.service.api.bearer = viewModel.token;
                localStorage.setItem('message_token', viewModel.token);
                callback(true)
            }
            callback(false)
        })
    }
    registration(model: LoginDTO, callback: any) {
        this.service.postRegistration(model, (f: LoginViewModel) => {
            if (f) {
                var viewModel = new LoginViewModel(f);
                this.auth = viewModel.user;
                this.service.api.bearer = viewModel.token;
                localStorage.setItem('message_token', viewModel.token);
                callback(true)
            }
            callback(false)
        })
    }
    postLogout(callback: any) {
        this.service.postLogout((f: boolean) => {
            if (f) {
                this.auth = undefined;
                this.isLoggedOut = true;
                callback(true)
            }
            callback(false)
        })
    }
    getPasswordReset(username: string) {
        this.service.getPasswordResetToken(username, (f: PasswordResetDTO) => {
            if (f) {
                var dto = new PasswordResetDTO(f);
                this.passwordReset = dto.code
            }
        })
    }
    postPasswordReset(model: PasswordResetDTO, callback: any) {
        this.service.postPasswordReset(model, (f: LoginViewModel) => {
            if (f) {
                var viewModel = new LoginViewModel(f);
                this.auth = viewModel.user;
                this.service.api.bearer = viewModel.token;
                callback(true)
            }
            callback(false)
        })
    }
}