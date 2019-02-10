import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItemComponent, GridsterItemComponentInterface } from 'angular-gridster2';
import {map} from 'rxjs/operators';
import {ChangeDetectionStrategy,  ViewEncapsulation} from '@angular/core';

import {CompactType, DisplayGrid, GridsterItem, GridType} from 'angular-gridster2';
import * as Plotly from 'plotly.js-dist/plotly.js';
import * as $ from 'jquery';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  static itemResizeSubject = new Subject<any>();
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized',  itemComponent);

    console.log('plotly draw');
    DashboardComponent.itemResizeSubject.next(itemComponent.el);
    
    // const ch =  itemComponent.el.children.map( itemw => itemw.id.contains('plot'));
    // Plotly.relayout(ch.id, {});
  }

  static eventStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
    console.log('eventStop', item, itemComponent, event);
  }

  static eventStart(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
    console.log('eventStart', item, itemComponent, event);
  }

  constructor() {
    DashboardComponent.itemResizeSubject.subscribe((element) => {
      console.log('subscription', element);
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
        font: { size: 18 },
        autosize: true,
        margin: {
          l: 10,
          r: 10,
          b: 40,
          t: 10,
          pad: 5
        },
        paper_bgcolor: '#7f7f7f',
        plot_bgcolor: '#c7c7c7'
      };
      setTimeout(() => {
        Plotly.newPlot(element, data, layout, { responsive: true, displayModeBar: false });
      }, 500);

      console.log('end');
    });
  }


  ngOnInit() {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      itemResizeCallback: DashboardComponent.itemResize,
      displayGrid: DisplayGrid.None,

      resizable: {
        delayStart: 0,
        enabled: true,
        start: DashboardComponent.eventStart,
        stop: DashboardComponent.eventStop,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      },
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    this.dashboard = [
      {cols: 2, rows: 1, y: 0, x: 0, itemProps: {text: 'first item', bgColor: '#a5a5a5'}, id: 1},
      {cols: 2, rows: 2, y: 0, x: 2, hasContent: true, itemProps: {text: 'second item'}, id: 2},
      {cols: 1, rows: 1, y: 2, x: 5, itemProps: {text: 'third item'}, id: 3},
      {cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2', itemProps: {text: '4th item'}, id: 4},
      {cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2', itemProps: {text: '5th item'}, id: 5},
      {cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled',
      itemProps: {text: '6th item'}, id: 6},
      {cols: 1, rows: 1, y: 2, x: 6, itemProps: {text: '6th item'}, id: 7}
    ];
  }

  draw() {
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

  const data = [ trace1 ];

  const layout = {
    title: 'Responsive to window\'s size!',
    font: {size: 18},
    autosize: true
  };
  // Plotly.newPlot('plot1', data, layout, {responsive: true});
    this.dashboard.forEach(element => {
      Plotly.newPlot('plot' + element.id, data, layout, {responsive: true});
    });
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
  }

}
