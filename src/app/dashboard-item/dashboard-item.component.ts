import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
interface Props {
  text?: string;
  bgColor?: string;
}

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.sass']
})
export class DashboardItemComponent implements OnInit {

  _props: Props;
  color  = 'blue';

  @Input() set props(value: Props) {
    console.log('props set to', value );
    if (value.bgColor) {
      this.color = value.bgColor;
    }
    this._props = value;
    // if (this._props) {
    //   if (this.props.bgColor) {
    //     this.color = this.props.bgColor;
    //     console.log('color set to ', this.color);
    //   }
    // }
  }
  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  ngOnInit() {
    if (this.color) {

    this.renderer.setStyle(
      this.el.nativeElement,
      'color',
      this.color
    );
    }
  }

}
