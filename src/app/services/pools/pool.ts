import { Injectable } from "@angular/core";
import { Member } from "src/app/models/messengers/Member";
import { Message } from "src/app/models/messengers/Message";
import { Pool } from "src/app/models/messengers/Pool";
import { ApiService } from "../api/api";
@Injectable({
    providedIn: 'root'
})
export class PoolService{
    base:string = '';
    constructor(public api:ApiService){
        if(api.dom.isLocal){
            this.base = "https://localhost:5001/"
        }
    }
    getPools(authId:string, callback:any){
        this.api.get(this.base + "messenger/api/v1/pools/members/" + authId).subscribe(d => {
            callback(d)
        })
    }
    postPools(model:Pool){
        this.api.post(this.base + "messenger/api/v1/pools", model).subscribe(d => {
     
        })
    }    
    postMessages(model:Message){
        this.api.post(this.base + "messenger/api/v1/pools/messages", model).subscribe(d => {
           
        })
    }
    postMembers(model:Member){
        this.api.post(this.base + "messenger/api/v1/pools/members", model).subscribe(d => {
           
        })
    }
    putMembers(model:Member){
        this.api.put(this.base + "messenger/api/v1/pools/members", model).subscribe(d => {
   
        })
    }
}