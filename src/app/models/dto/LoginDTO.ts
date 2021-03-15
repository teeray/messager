export class LoginDTO{
    userName:string = '';
    password:string = '';
    constructor(obj:LoginDTO = {} as LoginDTO){
        const {
            userName = '',
            password = ''
        } = obj;
        this.userName = userName;
        this.password = password;
    }
}