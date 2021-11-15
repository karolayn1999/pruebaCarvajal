import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  headers:any;

  constructor(
    public https: HttpClient
  ) {
    this.headers = new Headers();
   }

  getCreditCards(){
    return this.https.get(`http://192.168.0.16:8080/card/list`);
  }

  getCreditCardsActive(){
    return this.https.get(`http://192.168.0.16:8080/client/listActive`);
  }

  getClients(){
    return this.https.get(`http://192.168.0.16:8080/client/list`);
  }

  getBankAccount(){
    return this.https.get(`http://192.168.0.16:8080/account/list`);
  }

  putInactivateUser(id:any){
    return this.https.post(`http://192.168.0.16:8080/client/updateStatus?userId=`+ id +`&status=false` ,null, {responseType: 'text'});
  }

  putActivateUser(id:any){
    return this.https.post(`http://192.168.0.16:8080/client/updateStatus?userId=`+ id +`&status=true` ,null, {responseType: 'text'});
  }

  postSave(body:any){
    return this.https.post(`http://192.168.0.16:8080/client/save`,body, {responseType: 'text'});
  }

  putUpdate(body:any){
    return this.https.put(`http://192.168.0.16:8080/client/update`,body, {responseType: 'text'});
  }

  deleteUser(id:any){
    return this.https.delete(`http://192.168.0.16:8080/client/delete?userId=`+ id , {headers: this.headers,responseType:'text'});
  }

  postSaveAccount(body:any){
    return this.https.post(`http://192.168.0.16:8080/account/save`,body, {responseType: 'text'});
  }

  updateAccountNumber(body:any){
    return this.https.put(`http://192.168.0.16:8080/account/update`,body, {responseType: 'text'});
  }

  deleteAccount(id:any){
    return this.https.delete(`http://192.168.0.16:8080/account/delete?accountId=`+ id , {headers: this.headers,responseType:'text'});
  }

  getAccountsClient(idClient:any){
    return this.https.get(`http://192.168.0.16:8080/account/listByClient?userId=`+idClient);
  }

  postSaveCard(body:any){
    return this.https.post(`http://192.168.0.16:8080/card/save`,body, {responseType: 'text'});
  }

  updateCardCredit(body:any){
    return this.https.put(`http://192.168.0.16:8080/card/update`,body, {responseType: 'text'});
  }

  deleteCardCredit(id:any){
    return this.https.delete(`http://192.168.0.16:8080/card/delete?cardId=`+ id , {headers: this.headers,responseType:'text'});
  }
}
