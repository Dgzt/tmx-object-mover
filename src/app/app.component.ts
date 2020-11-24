import {Component, OnInit} from '@angular/core';
import {StateEnum} from './enum/state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public StateEnum = StateEnum;

  public state: StateEnum;

  ngOnInit(): void {
    this.state = StateEnum.UPLOAD;
  }

  public upload(event: any): void {
    const file = event.files[0];
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.state = StateEnum.PARAMETERS;
    };

    fileReader.readAsText(file);
  }
}
