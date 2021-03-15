import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/datas/auths/AuthData';
import { PoolData } from 'src/app/datas/pools/PoolData';
import { UserData } from 'src/app/datas/users/UserData';
import { Member } from 'src/app/models/messengers/Member';
import { Message } from 'src/app/models/messengers/Message';
import { Pool } from 'src/app/models/messengers/Pool';
import { User } from 'src/app/models/users/User';
import { Navigation } from 'src/app/utilities/helpers/navigation';

@Component({
  selector: 'app-message-control',
  templateUrl: './message-control.component.html',
  styleUrls: ['./message-control.component.scss']
})
export class MessageControlComponent implements OnInit {
  newPool:Pool;
  selectedPool:Pool;
  get orderedPools(){
    return this.data.pools.sort(function(a,b) {return new Date(b.created).getTime() - new Date(a.created).getTime()})
  }
  constructor(public data:PoolData, public auth:AuthData, public user:UserData, public nav:Navigation) { }

  ngOnInit(): void {
    if(!this.auth.auth){
      this.nav.homePress();
      return;
    }
    this.data.getPool(this.auth.auth.id)
    this.user.getAllUsers();
    this.createPool();
  }
  getMemberNames(pool:Pool){
    var auths = [].concat.apply([],pool.members.map(m => m.authID)) as Array<string>;
    var users = new Array<User>();
    auths.forEach((f:string) => {
      var user = this.user.allUsers.find(fi => fi.authID === f);
      if(user){
        users.push(user);
      }
    })
    var names = [].concat.apply([],users.map(m => m.name));
    return names.join(' | ')
  }
  createPool(){
    if(this.newPool){
      this.newPool = null;
    } else {
      this.newPool = new Pool();
      var member = new Member();
      member.authID = this.auth.auth.id;
      this.newPool.members.push(member);
    }
  }
}
