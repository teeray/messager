import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable({
    providedIn: 'root',
  })
export class Navigation{
    public get isHome(){
        return this.router.url === '/'       
    }
    public get isMessages(){
        return this.router.url === '/messages'
    }
    public get isUsers(){
        return this.router.url === '/users'
    }
    constructor(public router:Router){}
    homePress(){
        this.router.navigateByUrl('/')
    }
    messagePress(){
        this.router.navigateByUrl('/messages')
    }
    userPress(){
        this.router.navigateByUrl('/users')
    }
}