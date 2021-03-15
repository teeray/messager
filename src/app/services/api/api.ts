import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { DomHelper } from '../../utilities/helpers/domHelper';
import { Navigation } from 'src/app/utilities/helpers/navigation';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    env: string = '';
    _bearer: string = '';
    set bearer(value: string) {
        this._bearer = value;
    }
    get bearer(): string {
        return this._bearer;
    }
    public get baseHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Headers': 'access-control-allow-headers, access-control-allow-origin, access-control-allow-methods, content-type, cach-control, accept, authorize, pragma',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Pragma': 'no-cache',
            'Accept': 'application/json'
        })
    }
    constructor( public nav:Navigation, public dom: DomHelper, private _http: HttpClient) {
        if (this.dom.isLocal) {
            this.env = 'local';
            console.log('Local environment');
        } else if (this.dom.isMobileLocal) {
            this.env = 'mobilelocal'
            console.log("Mobile Local")
        } else {
            //prod here
            this.env = 'prod';
            console.log('Production Environment')
        }
    }
    buildHeader() {
        var headers = this.baseHeaders;
        if (this.bearer) {
            headers = headers.append('Authorization', 'Bearer ' + this.bearer);
        }
        return headers;
    }
    get(path: string): Observable<any> {
        return this._http.get(`${path}`, { headers: this.buildHeader() }).pipe(retry(0), catchError(err => this.checkForError(err)))
    }
    put(path: string, body: any): Observable<any> {
        return this._http.put(
            `${path}`,
            body,
            { headers: this.buildHeader() }
        ).pipe(retry(0), catchError(err => this.checkForError(err)))
    }
    post(path: string, body: any): Observable<any> {
        return this._http.post(
            `${path}`,
            body,
            { headers: this.buildHeader() }
        ).pipe(retry(0), catchError(err => this.checkForError(err)))
    }
    delete(path: string): Observable<any> {
        return this._http.delete(
            `${path}`,
            { headers: this.buildHeader() }
        ).pipe(retry(0), catchError(err => this.checkForError(err)))
    }
    private checkForError(err: HttpErrorResponse) {
        let message = '';
        if (err.error instanceof ErrorEvent) {
            message = err.error.message;
        } else {
            message = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        if(err.status === 401){
            this.nav.homePress();
        }
        return throwError(message);
    }
}
