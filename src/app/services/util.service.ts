import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare const CryptoJS: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }
  Encrypt(value: any): string {
    const jsonData = JSON.stringify(value); //json string
    const encData = CryptoJS.AES.encrypt(jsonData, environment.encKey);
    return encData;
  }
  Decrypt(value: string): any {
    const decData = CryptoJS.AES.decrypt(value, environment.encKey);
    const jsonData = decData.toString(CryptoJS.enc.Utf8); //json string
    return JSON.parse(jsonData); //js object
  }
}
