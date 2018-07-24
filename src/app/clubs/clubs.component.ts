import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import Feature from 'ol/Feature';
import * as geom from 'ol/geom';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls, ZoomToExtent } from 'ol/control.js';
import { Club } from './club.model';

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Fill, Icon, Stroke, Style } from 'ol/style.js';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  targetElement: string;
  clubs: Array<Club>;
  constructor() {
    this.targetElement = 'map';
    this.clubs = [new Club('ATR', 'www.alliancetennisrhodanien.fr', 45.425706, 4.774894)];
  }

  ngOnInit() {
    const iconFeature = new Feature({
      geometry: new geom.Point(fromLonLat([this.clubs[0].lon, this.clubs[0].lat])),
      name: this.clubs[0].nom
    });
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [iconFeature]
      }),
      style: new Style({
        image: new Icon(
          /** @type {module:ol/style/Icon~Options} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.95,
            src: 'assets/tennis-ball.png'
          })
        ),
        stroke: new Stroke({
          width: 3,
          color: [255, 0, 0, 1]
        }),
        fill: new Fill({
          color: [0, 0, 255, 0.6]
        })
      })
    });

    const myMap = new Map({
      target: this.targetElement,
      controls: defaultControls({
        attributionOptions: {
          collapsible: false
        }
      }).extend([
        new ZoomToExtent({
          extent: [4.638715, 45.213284, 5.040402, 45.533327]
        })
      ]),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([4.861188, 45.385227]),
        zoom: 10
      })
    });
  }
}
