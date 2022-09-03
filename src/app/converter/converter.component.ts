import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../shared/header/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  form!: FormGroup

  from!: string
  to!: string

  constructor(
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.createForm()
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

}
