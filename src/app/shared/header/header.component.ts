import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RatesResponse } from '../interfaces';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  USD = ''
  EUR = ''
  PLN = ''

  baseUSD = ''
  baseEUR = ''
  basePLN = ''

  uSub!: Subscription
  eSub!: Subscription
  pSub!: Subscription

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.uSub = this.currencyService.getRateUSD().subscribe((response: RatesResponse) => {
      this.USD = response.rates.UAH.toFixed(2)
      this.baseUSD = response.base
    })

    this.eSub = this.currencyService.getRateEUR().subscribe((response: RatesResponse) => {
      this.EUR = response.rates.UAH.toFixed(2)
      this.baseEUR = response.base
    })

    this.pSub = this.currencyService.getRatePLN().subscribe((response: RatesResponse) => {
      this.PLN = response.rates.UAH.toFixed(2)
      this.basePLN = response.base
    })
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
    if (this.eSub) {
      this.uSub.unsubscribe()
    }
    if (this.pSub) {
      this.uSub.unsubscribe()
    }
  }

}
