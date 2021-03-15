import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class DomHelper {
    get isLocal(): boolean {
        return this.hostName.toLowerCase().indexOf('localhost') >= 0
    }
    get isProduction(): boolean {
        return this.hostName.toLowerCase().indexOf('localhost') === -1
    }
    get isMobileLocal(): boolean {
        return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1
    }
    get urlBase() {
        if (this.isLocal) {
            return 'https://localhost:4200'
        } else if (this.isMobileLocal) {
            return 'https://production.client'
        } else {
            return 'https://production.client'
        }
    }
    get hostName() { 
        return document.location.hostname;
    }
    get localStorage() {
        return localStorage;
    }
    get isSmall() {
        if (window && window.innerWidth < 768) {
            return true;
        }
        return false;
    }
    get isLarge() {
        if (window && window.innerWidth >= 990) {
            return true;
        }
        return false;
    }
    get isXLarge() {
        if (window && window.innerWidth >= 1200) {
            return true;
        }
        return false;
    }
    constructor(@Inject(DOCUMENT) private document = null) {
    }
}