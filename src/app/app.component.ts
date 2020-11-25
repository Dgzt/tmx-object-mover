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
  public modifiedMap: any;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  public upload(event: any): void {
    const file = event.files[0];
    console.log(event);

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const parser = new Parser();
      parser.parseString(fileReader.result, (error, result) => {
        if (result) {
          this.map = result;
          console.log(this.map);
        } else {
          // TODO show error message
        }
      });
    };

    fileReader.readAsText(file);
    this.fileUpload.clear();
  }

  public onSubmit(): void {
    const rate = this.form.value.rate;
    this.modifiedMap = Object.assign(this.map);

    this.modifiedMap.map.objectgroup.forEach(og => {
      og.object.forEach(o => {
        o.$.x *= rate;
        o.$.y *= rate;
      });
    });

    // const blob = new Blob([], { type: 'application/x-tiled-tmx'});
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
    // TODO download
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      rate: ['1.000', Validators.required]
    });
  }
}
