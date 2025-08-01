import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from "./features/shared";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'share_your_recepie';
}
