import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from "./features/shared";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'share_your_recepie';


}


