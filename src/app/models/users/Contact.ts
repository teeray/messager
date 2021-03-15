import { HIDC } from "../base/hidc";

export class Contact extends HIDC{
    userID:number = -1;
    link:string = '';
    type:string = '';
    constructor(obj: Contact = {} as Contact){        
        super(obj);
      const {
        userID = 0,
        link = '',
        type = ''
        } = obj;
        this.userID = userID;
        this.link = link;
        this.type = type;
    } 
    update(obj: Contact = {} as Contact){        
        super.update(obj);
      const {
        userID = 0,
        link = '',
        type = ''
        } = obj;
        this.userID = userID;
    }
}