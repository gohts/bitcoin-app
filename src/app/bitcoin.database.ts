import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { OrderDetail } from './models'

@Injectable()
export class BitcoinDatabase extends Dexie {
    private formData: Dexie.Table<OrderDetail, number>;

    public  constructor () {
        super('BitcoinDatabase');

        this.version(1).stores({
            formData: "id++, name"
        })

        this.formData = this.table('formData');
    }

    addFormData (f: OrderDetail): Promise<any> {
        return this.formData.put(f);    
    }

    getFormData(): Promise<OrderDetail[]> {
        return this.formData.toArray();
    }

    clearFormData(): Promise<any> {
        console.log('triggered');
        
        return this.formData.clear()
    }
}