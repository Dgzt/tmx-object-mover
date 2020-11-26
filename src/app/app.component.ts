import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUpload} from 'primeng/fileupload';
import {Parser, Builder} from 'xml2js';
import {saveAs} from 'file-saver';

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
    const changeSize = this.form.value.changeSize;
    const rate = this.form.value.rate;
    this.modifiedMap = Object.assign(this.map);

    this.modifiedMap.map.objectgroup.forEach(og => {
      og.object.forEach(o => {
        if (changeSize) {
          o.$.width *= rate;
          o.$.height *= rate;
        }

        o.$.x *= rate;
        o.$.y *= rate;
      });
    });

    const builder = new Builder();
    const xml = builder.buildObject(this.modifiedMap);
    const blob = new Blob([xml], { type: 'application/x-tiled-tmx'});
    saveAs(blob, 'map.tmx');
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      changeSize: [true, Validators.required],
      rate: ['1.000', Validators.required]
    });
  }
}
