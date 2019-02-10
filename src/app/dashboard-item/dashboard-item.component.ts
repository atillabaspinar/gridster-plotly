import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import * as Plotly from 'plotly.js-dist/plotly.js';
import {Config, Data, Layout} from 'plotly.js-dist/plotly.js';


interface Props {
  text?: string;
  bgColor?: string;
}

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas1') canvas: ElementRef;
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
    console.log('onInit');
    console.log(this.canvas);
    const trace1 = {
      type: 'bar',
      x: [1, 2, 3, 4],
      y: [5, 10, 2, 8],
      marker: {
        color: '#C8A2C8',
        line: {
          width: 2.5
        }
      }
    };

    const data = [trace1];

    const layout = {
      title: 'Responsive to window\'s size!',
      font: { size: 18 },
      autsize: true
    };
    Plotly.newPlot(this.canvas.nativeElement, data, layout, { responsive: true });
  }

  ngAfterViewInit(): void {
    console.log('afterviewinit');
    console.log(this.canvas);
  }

  relayout() {
    Plotly.relayout(this.canvas.nativeElement, {
      'xaxis.autorange': true,
      'yaxis.autorange': true
  });
  }
}
