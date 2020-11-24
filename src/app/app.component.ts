import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public upload(event: any): void {
    const file = event.files[0];
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    };

    fileReader.readAsText(file);
  }
}
