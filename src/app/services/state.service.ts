import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class StateApp {

    private subject = new BehaviorSubject({});
    data: any = { state: [] };

    constructor() {
        this.data['state'] = [];
    }

    getObservable(): Observable<any> {
        return this.subject.asObservable();
    }

    setData(value: any) {
        var keyValue = Object.keys(value);
        this.data['state'][keyValue[0]] = value[keyValue[0]];
        console.log("setData => ", this.data);
        this.subject.next(this.data['state']);
    }


}