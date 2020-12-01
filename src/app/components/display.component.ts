import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BitcoinDatabase } from '../bitcoin.database';
import { OrderDetail } from '../models';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  formData:OrderDetail
  elementType = 'url';
  value = '';
  bitcoinAddress = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq';

  constructor(private bitcoinDB: BitcoinDatabase, private router: Router) { }

  ngOnInit(): void {
    this.bitcoinDB.getFormData()
      .then(res => {
        this.formData = res[0] as OrderDetail
        this.value = JSON.stringify(this.formData)
      })
  }

  ngOnDestroy() {
    this.bitcoinDB.clearFormData()
  }

  routeToHome() {
    this.router.navigate(['/'])
  }

}
