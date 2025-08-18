import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from "./features/shared/components";
import { HttpClient } from '@angular/common/http';
import { ErrorNotification } from "./features/shared/components/error-notification/error-notification";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'share_your_recepie';


}


