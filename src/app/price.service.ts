// this.cartContent = await this.http.get<CartItem[]>('http://localhost:3000/cart')
// this.cartItem = await this.http.get<CartItem>(`http://localhost:3000/cart/${$event}`)
// this.http.put<any>(`http://localhost:3000/cart/${$event.id}`,$event)

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'

@Injectable()
export class PriceService {

    baseUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCSGD'
    APIKEY = environment.APIKEY
    httpOptions = {
        headers: new HttpHeaders({
            'x-ba-key': this.APIKEY
        })
    }

    constructor(private http:HttpClient) {}

    async getRate() {
        return await this.http.get(this.baseUrl, this.httpOptions)
            .toPromise()
        // this.http.get<CartItem[]>('http://localhost:3000/cart').toPromise()
    }

}
