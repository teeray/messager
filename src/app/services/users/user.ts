import { Injectable } from "@angular/core";
import { ApiService } from "../api/api";
@Injectable({
    providedIn: 'root'
})
export class UserService{
    base:string = '';
    constructor(public api:ApiService){
        if(api.dom.isLocal){
            this.base = "https://localhost:5002/"
        }
    }
    getAllUsers(callback:any){
        this.api.get(this.base + "user/api/v1/users").subscribe(d => {
            callback(d)
        })
    }
    getYourUser(authId:string,callback:any){
        this.api.get(this.base + 'user/api/v1/users/' + authId).subscribe(d => {
            callback(d)
        })
    }
    postYourUser(user:any, callback:any){
        this.api.post(this.base + 'user/api/v1/users', user).subscribe(d => {
            callback(d);
        })
    }
    putYourUser(user:any, callback:any){
        this.api.put(this.base + 'user/api/v1/users', user).subscribe(d => {
            callback(d);
        })
    }
}