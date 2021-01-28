import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor( private http: HttpClient) { }

  sendSms(msg, phone){
    let url="https://sistemasmasivos.com/itcloud/api/sendsms/send.php?user=jesus_adolfo_romero_garcia@hotmail.com&password=RlHRpSrhg0&GSM=57"+phone+"&SMSText="+msg;
    this.http.post(url, {}).subscribe((data) => {
      console.log(data);
    });
  }
}
