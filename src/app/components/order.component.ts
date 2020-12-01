import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BitcoinDatabase } from '../bitcoin.database';
import { PriceService } from '../price.service';
import { OrderDetail } from '../models'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  cryptocurrency
  price: number
  cryptocurrencyPair: string = 'SGD/BTC'
  totalAmount: number = 0;
  ageLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 21));
  todayDate = new Date();

  orderForm: FormGroup;
  
  constructor(private fb: FormBuilder, private priceSvc: PriceService, private router: Router, private bitcoinDB: BitcoinDatabase) { }

  ngOnInit(): void {

    this.priceSvc.getRate()
      .then(res => {
        this.price = res['last'];
      });

    this.orderForm = this.fb.group({
      name: this.fb.control('',[Validators.required]),
      contact:  this.fb.control('',[Validators.required,Validators.pattern('^[ 0-9()+-]*$')]),
      gender: this.fb.control('',[Validators.required]),
      dateOfBirth: this.fb.control('',[Validators.required]),
      orderDate: this.fb.control('',[Validators.required]),
      orderType: this.fb.control('',[Validators.required]),
      orderUnit: this.fb.control('',[Validators.required, Validators.pattern('^[0-9]*$')])
    });

  }

  onUnitChange() {
    this.totalAmount = (( parseInt(this.orderForm.get('orderUnit').value) || 0 ) * this.price);
  }

  onFormSubmit() {
    let formData = this.orderForm.value
    formData['price'] = this.price.toFixed(2);
    formData['totalAmount'] = this.totalAmount.toFixed(2);
    formData['dateOfBirth']=this.orderForm.get('dateOfBirth').value.format("Do MMM YYYY")
    formData['orderDate']=this.orderForm.get('orderDate').value.format("Do MMM YYYY")    
    console.log(formData);
    this.bitcoinDB.addFormData(formData as OrderDetail)
    this.router.navigate(['/display'])
  }

  onFormReset() {
    this.orderForm.reset();
  }

}