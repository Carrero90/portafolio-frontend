export class Login {

    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date){}

    //metodo para tener acceso al token

    get token(){
        //agregar controles
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token
    }
}
