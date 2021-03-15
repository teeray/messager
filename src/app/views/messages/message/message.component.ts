import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/models/messengers/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Output() sendHit:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancelHit:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() message:Message
  constructor() { }

  ngOnInit(): void {
  }

}
