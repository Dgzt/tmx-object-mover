import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Parser} from 'xml2js';
import {FileUpload} from 'primeng/fileupload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild(FileUpload, {static: false}) fileUpload: FileUpload;

  public map: any;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
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
        } else {
          // TODO show error message
        }
      });
    };

    fileReader.readAsText(file);
    this.fileUpload.clear();
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
