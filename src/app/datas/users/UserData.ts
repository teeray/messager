import { Injectable } from "@angular/core";
import { User } from "src/app/models/users/User";
import { UserService } from "src/app/services/users/user";

@Injectable({
    providedIn: 'root'
})
export class UserData{
    user:User;
    compare:User;
    allUsers:Array<User> = new Array<User>();
    constructor(public service:UserService){ }
    getUser(authId:string, callback:any){
        this.service.getYourUser(authId,(f: User) => {
            if(f){
                this.user = new User(f);
                this.compare = new User(f);
                callback(true)
            }
            callback(false)
        })
    }
    getAllUsers(){
        this.service.getAllUsers((f:Array<User>) => {
            var users = new Array<User>();
            f.forEach(fo => {
                users.push(new User(fo));
            })
            this.allUsers = users;
        })
    }
    putUser(){
        this.service.putYourUser(this.user,(f: User) => {
            if(f){
                this.user?.update(f)
                this.compare = new User(f)
            }
        })
    }
    postUser(){
        this.service.postYourUser(this.user,(f: User) => {
            if(f){
                this.user?.update(f);
                this.compare = new User(f)
            }
        })
    }
}