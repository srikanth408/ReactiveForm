import { Component, OnInit,Input  } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
@Input() errorMsg: string;
  @Input() displayError: boolean;
  constructor() { }

  ngOnInit() {
  }

}
