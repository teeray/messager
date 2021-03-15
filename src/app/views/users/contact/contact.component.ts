import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/users/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Output() saveHit:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() contact:Contact;
  @Input() isNew:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
