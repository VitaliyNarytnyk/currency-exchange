import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  USD!: number
  EUR!: number
  PLN!: number

  uSub!: Subscription
  eSub!: Subscription
  pSub!: Subscription

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.uSub = this.currencyService.getRateUSD().subscribe((response: any) => {
      console.log('USD', response)
      this.USD = response.rates.UAH.toFixed(2)
    })

    this.eSub = this.currencyService.getRateEUR().subscribe((response: any) => {
      console.log('EUR', response)
      this.EUR = response.rates.UAH.toFixed(2)
    })

    this.pSub = this.currencyService.getRatePLN().subscribe((response: any) => {
      console.log('PLN', response)
      this.PLN = response.rates.UAH.toFixed(2)
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
