import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _httpClient: HttpClient) {}
  ngOnInit(): void {
    this._httpClient.get('https://reqres4.in/api/login').subscribe((data) => {
      console.log(data);
    });
  }
}
