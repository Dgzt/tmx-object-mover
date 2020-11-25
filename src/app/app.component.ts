import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Parser} from 'xml2js';
import {StateEnum} from './enum/state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public StateEnum = StateEnum;

  public state: StateEnum;

  private map: any;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.state = StateEnum.UPLOAD;

    this.form = this.createForm();
  }

  public upload(event: any): void {
    const file = event.files[0];
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      const parser = new Parser();
      parser.parseString(fileReader.result, (error, result) => {
        if (result) {
          this.map = result;
          this.state = StateEnum.PARAMETERS;
        } else {
          // TODO show error message
        }
      });
    };

    fileReader.readAsText(file);
  }

  public onSubmit(): void {
    console.log('todo');
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      rate: ['1.000', Validators.required]
    });
  }
}
