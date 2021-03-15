import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { Member } from "src/app/models/messengers/Member";
import { Message } from "src/app/models/messengers/Message";
import { Pool } from "src/app/models/messengers/Pool";
import { PoolService } from "src/app/services/pools/pool";
import { MessageSocket } from "src/app/services/sockets/messageSocket";
import { AuthData } from "../auths/AuthData";

@Injectable({
    providedIn: 'root'
})
export class PoolData implements OnInit{
    @Output() poolHit:EventEmitter<Pool> = new EventEmitter<Pool>();
    @Output() sendHit:EventEmitter<Message> = new EventEmitter<Message>();
    @Output() addHit:EventEmitter<Member> = new EventEmitter<Member>();
    @Output() updateHit:EventEmitter<Member> = new EventEmitter<Member>();
    pools:Array<Pool> = [];
    constructor(public service:PoolService, public socket:MessageSocket, public auth:AuthData){
        this.ngOnInit();
    }
    ngOnInit(): void {
        this.socket.sendHit.subscribe(d => {
            this.resolveMessage(d)
            this.sendHit.emit(d);
        })
        this.socket.addHit.subscribe(d => {
            this.resolveMember(d)
            this.addHit.emit(d)
        })
        this.socket.updateHit.subscribe(d => {
            this.resolveMember(d)
            this.updateHit.emit(d)
        })
        this.socket.poolHit.subscribe(d => {
            this.resolvePool(d);
            this.poolHit.emit(d)
        })
    }
    resolveMessage(message:Message){
        var poolIndex = this.pools.findIndex(f => f.id === message.poolID);
        if(poolIndex > -1){
            this.pools[poolIndex].messages.push(message)
        }
    }
    resolveMember(member:Member){
        var poolIndex = this.pools.findIndex(f => f.id === member.poolID);
        if(poolIndex > -1){
            var memberIndex = this.pools[poolIndex].members.findIndex(f => f.id === member.id);
            if(memberIndex > -1){
                this.pools[poolIndex].members[memberIndex].update(member)
            } else {
                this.pools[poolIndex].members.push(member);
            }
        }
    }
    resolvePool(pool:Pool){
        var poolIndex = this.pools.findIndex(f => f.id === pool.id);
        if(poolIndex > -1){
            this.pools[poolIndex].update(pool)
        } else {
            if(pool.members.some(s => s.authID === this.auth.auth?.id)){
                this.pools.push(pool)
            }
        }
    }
    getPool(authId:string){
        this.service.getPools(authId,(f: Array<Pool>) => {
            if(f){
                var pools = new Array<Pool>();
                f.forEach(f => {
                    pools.push(new Pool(f))
                })
                this.pools = pools
            }
        })
    }
    postPool(pool:Pool){
        this.service.postPools(pool)
    }
    postMessage(message:Message){
        this.service.postMessages(message);
    }
    postMember(member:Member){
        this.service.postMembers(member)
    }
    putMember(member:Member){
        this.service.putMembers(member);
    }
}