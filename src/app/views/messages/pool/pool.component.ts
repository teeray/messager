import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthData } from 'src/app/datas/auths/AuthData';
import { PoolData } from 'src/app/datas/pools/PoolData';
import { UserData } from 'src/app/datas/users/UserData';
import { Member } from 'src/app/models/messengers/Member';
import { Message } from 'src/app/models/messengers/Message';
import { Pool } from 'src/app/models/messengers/Pool';
import { User } from 'src/app/models/users/User';
@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  @Output() newHit:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() pool:Pool;
  newMessage:Message;
  get members(){
    return this.pool.members.filter(f => !f.isDeleted);
  }
  get orderedMessages(){
    return this.pool.messages
    .sort(function(a,b) {return new Date(b.created).getTime() - new Date(a.created).getTime()})
  }
  get getOtherUsers(){
    return this.data.allUsers
    .filter(f => !f.isDeleted && !this.members.some(s => s.authID === f.authID))
  }
  constructor(public data:UserData, public auth:AuthData, public poolData:PoolData) { }
  ngOnInit(): void {
  }
  getUserName(authId:string){    
    var user = this.data.allUsers.find(f => f.authID === authId);
    if(user){
      return user.name;
    }
    return ''
  }
  getUserImage(authId:string){    
    var user = this.data.allUsers.find(f => f.authID === authId);
    if(user && user.avatar){
      return user.avatar.file;
    }
    return null
  }
  addUser(user:User){
    var member = new Member();
    member.authID = user.authID;
    this.pool.members.push(member);
  }
  addMessage(){
    this.newMessage = new Message();
    this.newMessage.fromAuth = this.auth.auth.id;
  }
  sendMessage(){
    if(this.pool.id < 1){
      this.pool.messages.push(this.newMessage);
      this.poolData.poolHit.subscribe(d => {
        var pol = this.poolData.pools.find(f => f.id === d.id);
        if(pol){
          this.pool = pol;
          this.newMessage = null;
        }
      })
      this.poolData.postPool(this.pool)
    }else {
      this.newMessage.poolID = this.pool.id;
      this.poolData.postMessage(this.newMessage);
      this.newMessage = null;
    }
  }
}
