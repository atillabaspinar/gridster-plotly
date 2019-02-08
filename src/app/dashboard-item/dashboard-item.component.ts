import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
interface Props {
  text?: string;
  bgColor?: string;
}

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {

  @ViewChild('canvas') canvas: HTMLElement;
  _props: Props;
  color  = 'aquamarine';

  @Input() set props(value: Props) {
    console.log('props set to', value);
    if (value.bgColor) {
      this.color = value.bgColor;
    }
    this._props = value;
  }
  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  ngOnInit() {
  }

}
