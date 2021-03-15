import { HIDC } from "../base/hidc";
import { Contact } from "./Contact";
import { Image } from "./Image";

export class User extends HIDC {
    authID: string = '';
    name: string = '';
    profile: string = '';
    birthDate: Date = new Date();
    avatar: Image = null;
    contacts: Array<Contact> = new Array<Contact>();
    constructor(obj: User = {} as User) {
        super(obj)
        const {
            authID = '',
            name = '',
            profile = '',
            birthDate = new Date(),
            avatar = null,
            contacts = new Array<Contact>(),
        } = obj;
        this.authID = authID;
        this.name = name;
        this.profile = profile;
        if (birthDate) {
            this.birthDate = new Date(birthDate);
        }
        if (avatar) {
            this.avatar = new Image(avatar)
        }
        if (contacts) {
            contacts.forEach(f => {
                this.contacts.push(new Contact(f));
            })
        }
    }
    update(obj: User = {} as User) {
        super.update(obj);
        const {
            authID = '',
            name = '',
            profile = '',
            birthDate = new Date(),
            avatar = new Image(),
            contacts = new Array<Contact>(),
        } = obj;
        if (avatar) {
            if (!this.avatar) {
                this.avatar = new Image();
            }
            this.avatar.update(avatar)
        }
        if (contacts) {
            contacts.forEach((f, index) => {
                var find = this.contacts.find(fi => fi.id === f.id);
                if (find !== undefined) {
                    find.update(f)
                } else if (this.contacts.length >= index) {
                    this.contacts[index].update(f);
                }
            })
        }
    }
}