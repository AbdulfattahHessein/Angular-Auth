import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    console.log(this.activatedRoute.snapshot.data['Hi']);
  }
}
