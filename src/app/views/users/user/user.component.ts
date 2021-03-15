import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/datas/auths/AuthData';
import { UserData } from 'src/app/datas/users/UserData';
import { Contact } from 'src/app/models/users/Contact';
import { Image } from 'src/app/models/users/Image'
import { ModelHelper } from 'src/app/utilities/helpers/modelHelper';
import { Navigation } from 'src/app/utilities/helpers/navigation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  newContact:Contact = null;
  get authID(){
    if(!this.auth.auth){
      return ''
    }
    return this.auth.auth.id;
  }
  get needUpdate(){
    return !this.helper.deepEqual(this.data.user,this.data.compare)
  }
  get contacts(){
    return this.data.user.contacts.filter(f => !f.isDeleted)
  }
  constructor(public data:UserData, public auth:AuthData, public helper:ModelHelper, public nav:Navigation) { }

  ngOnInit(): void {
    this.data.getUser(this.authID, (f:boolean) => { })
  }
  setDate(date: string) {
    this.data.user.birthDate = new Date(date);
  }
  addContacts(){
    if(!this.newContact){
      this.newContact = new Contact();
      this.newContact.userID = this.data.user.id;
    } else {
      this.data.user.contacts.push(this.newContact)
      this.newContact = null;
    }
  }
  addFile(event: Event) {
    if (!event) {
      return;
    }
    const target = event.target as any;
    if (target) {
      var files = target.files as FileList
      if (files) {
        this.data.user.avatar = new Image();

        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (readerEvt: any) {
          this.data.user.avatar.file = readerEvt.target.result;
        }.bind(this)
      }
    }
  }
}
