import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'filmopedia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  projectName = '';

  constructor() {}

  ngOnInit(): void {
    this.projectName = environment.projectName;
  }
}
