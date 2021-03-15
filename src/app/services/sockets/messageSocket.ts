import { EventEmitter, Injectable, Output } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Member } from "src/app/models/messengers/Member";
import { Message } from "src/app/models/messengers/Message";
import { Pool } from "src/app/models/messengers/Pool";

@Injectable({
    providedIn: 'root'
})
export class MessageSocket{    
    @Output() poolHit:EventEmitter<Pool> = new EventEmitter<Pool>();
    @Output() sendHit:EventEmitter<Message> = new EventEmitter<Message>();
    @Output() addHit:EventEmitter<Member> = new EventEmitter<Member>();
    @Output() updateHit:EventEmitter<Member> = new EventEmitter<Member>();
    message:HubConnection = new HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl('https://localhost:5001/sockets/messages')    
    .build();
    constructor(){
        this.startup();
    }
    startup(): void {
        this.message.start();
        this.message.on('sendPool',(pool:Pool) =>{
            this.poolHit.emit(pool);
        })
        this.message.on('sendMessage',(message:Message) =>{
            this.sendHit.emit(message);
        })
        
        this.message.on('addMember',(member:Member) =>{
            this.addHit.emit(member)
        })
        
        this.message.on('updateMember',(member:Member) =>{
            this.updateHit.emit(member)
        })
    }
}