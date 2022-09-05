import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../shared/header/currency.service';
import { ConvertResponse } from '../shared/interfaces';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {

  form!: FormGroup

  from!: string
  to!: string

  amountFrom!: string
  amountTo!: string

  convertSub!: Subscription

  show!: number

  loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    public currencyService: CurrencyService
  ) { }


  ngOnInit(): void {
    this.createForm()
  }

  ngOnDestroy(): void {
    if (this.convertSub) {
      this.convertSub.unsubscribe()
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      from: ['USD', Validators.required],
      to: ['UAH', Validators.required],
      amountFrom: [null, Validators.required],
      amountTo: [null, Validators.required],
    })
  }

  selected(event: Event, side: string) {
    if (side == 'from') {
      this.from = (event.target as HTMLInputElement).value
    } else {
      this.to = (event.target as HTMLInputElement).value
    }
  }

  changeSelect(form: FormGroup) {
    const from = form.controls['from'].value
    const to = form.controls['to'].value

    this.form.controls['from'].patchValue(to)
    this.form.controls['to'].patchValue(from)
  }

  convert(event: Event, side: string) {
    if (side == 'from') {
      this.form.controls['amountFrom'].patchValue((event.target as HTMLInputElement).value)
      this.amountFrom = (event.target as HTMLInputElement).value
    } else {
      this.form.controls['amountTo'].patchValue((event.target as HTMLInputElement).value)
      this.amountTo = (event.target as HTMLInputElement).value
    }

    if (this.form.controls['amountFrom'].value == null && this.form.controls['amountTo'].value !== null) {
      this.amountFrom = this.amountTo
      this.form.controls['amountFrom']
    } else if (this.form.controls['amountFrom'].value !== null && side == 'from') {
      this.amountFrom = this.amountFrom
    } else if (this.form.controls['amountFrom'].value !== null && side == 'to') {
      this.amountFrom = this.amountTo
      this.from = this.form.controls['to'].value
      this.to = this.form.controls['from'].value
    }

    const data = {
      from: this.from ?? 'USD',
      to: this.to ?? 'UAH',
      amountTo: this.amountTo,
      amountFrom: this.amountFrom
    }

    console.log('DATA', data)

    this.loading = true

    this.convertSub = this.currencyService.convert(data).subscribe((response: ConvertResponse) => {
      this.loading = false
      if (side == 'from') {
        this.form.controls['amountTo'].patchValue(response.result)
      } else {
        this.form.controls['amountFrom'].patchValue(response.result)
      }
    })
  }

}
