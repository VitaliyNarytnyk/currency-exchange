import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConvertResponse, RatesResponse } from "../interfaces";

@Injectable({ providedIn: 'root' })

export class CurrencyService {

	headers = {
		'apiKey': 'Pn08e2DIx7iynyWZ5riuNeBq8HqaTbcf'
	}

	requestOptions = {
		headers: new HttpHeaders(this.headers)
	}

	constructor(private http: HttpClient) { }

	getRateUSD(): Observable<RatesResponse> {
		return this.http.get<RatesResponse>(`https://api.apilayer.com/exchangerates_data/latest?symbols=UAH&base=USD`, this.requestOptions)
	}

	getRateEUR(): Observable<RatesResponse> {
		return this.http.get<RatesResponse>(`https://api.apilayer.com/exchangerates_data/latest?symbols=UAH&base=EUR`, this.requestOptions)
	}

	getRatePLN(): Observable<RatesResponse> {
		return this.http.get<RatesResponse>(`https://api.apilayer.com/exchangerates_data/latest?symbols=UAH&base=PLN`, this.requestOptions)
	}

	convert(data: {
		from: string;
		to: string;
		amountTo: string;
		amountFrom: string;
	}): Observable<ConvertResponse> {

		return this.http.get<ConvertResponse>(`http://api.apilayer.com/exchangerates_data/convert?to=${data.to}&from=${data.from}&amount=${data.amountFrom}`, this.requestOptions)
	}

}