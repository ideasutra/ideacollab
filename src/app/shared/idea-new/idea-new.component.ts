import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-idea-new',
  templateUrl: './idea-new.component.html',
  styleUrls: ['./idea-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaNewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
