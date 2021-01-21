import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class OneSignalService {

	constructor(private http: HttpClient) { }

	sendDirectMessage(id, message) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Basic MWU2ZTBiMjgtYmEzNy00ZDJmLTliNDUtYzc2MGRhMWUzMzk0'
		});

		const options = { headers: headers };
		const dataSend = JSON.stringify({
			app_id: "70a34cfc-2a6d-4924-aab0-299477cc31d9",
			contents: { "en": message },
			include_player_ids: [id],
			data: {text: 'esto es ua prueba'}
		});

		this.http.post('https://onesignal.com:443/api/v1/notifications', dataSend, options).subscribe((data) => {
			console.log(data);
		});
	}
}
