import { HIDC } from "../base/hidc";
import { Member } from "./Member";
import { Message } from "./Message";

export class Pool extends HIDC {
    members: Array<Member> = new Array<Member>();
    messages: Array<Message> = new Array<Message>();
    constructor(obj: Pool = {} as Pool) {
        super(obj)
        const {
            members = new Array<Member>(),
            messages = new Array<Message>(),
        } = obj;
        if (members) {
            members.forEach(f => {
                this.members.push(new Member(f));
            })
        }
        if (messages) {
            messages.forEach(f => {
                this.messages.push(new Message(f));
            })
        }
    }
    update(obj: Pool = {} as Pool) {
        super.update(obj);
        const {
            members = new Array<Member>(),
            messages = new Array<Message>(),
        } = obj;
        if (messages) {
            messages.forEach((f, index) => {
                var find = this.messages.find(fi => fi.id === f.id);
                if (find !== undefined) {
                    find.update(f)
                } else if (this.messages.length >= index) {
                    this.messages[index].update(f);
                }
            })
        }
        if (members) {
            members.forEach((f, index) => {
                var find = this.members.find(fi => fi.id === f.id);
                if (find !== undefined) {
                    find.update(f)
                } else if (this.members.length >= index) {
                    this.members[index].update(f);
                }
            })
        }
    }
}