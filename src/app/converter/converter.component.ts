import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder
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

}
