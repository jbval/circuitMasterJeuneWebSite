import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import Feature from 'ol/Feature';
import * as geom from 'ol/geom';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls, ZoomToExtent } from 'ol/control.js';
import { Club } from './club.model';
import Overlay from 'ol/Overlay.js';
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
  // selectedClub: string;

  constructor() {
    // this.selectedClub = '';
    this.targetElement = 'map';
    this.clubs = [
      new Club('TC VIENNE', 'http://www.tennisclubvienne.fr', 45.502689, 4.84779),

      new Club('TC RAMBERTOIS', 'http://www.tennis-saint-rambert.fr', 45.299349, 4.819858),
      new Club('TC PONT-EVEQUE', 'http://tcpe.net', 45.531927, 4.925397),
      new Club('TC SAMAURITAIN', 'http://tennisclubsamauritain.com', 45.396481, 4.769996),
      new Club('TC ROUSSILLON', 'http://www.club.fft.fr/tennisclubroussillon', 45.363439, 4.804456),
      new Club('TC LA SANNE', 'http://www.club.fft.fr/tc.lasanne/', 45.385333, 4.888573),
      new Club(
        'TC PEAGE DE ROUSSILLON',
        'http://www.club.fft.fr/peage.de.roussillon',
        45.367499,
        4.791359
      ),
      new Club('TC CLONAS-CHAVANAY', 'https://tcclonas.fr', 45.413298, 4.786129),
      new Club('TC ANNONAY', 'http://tennisclubannonay.com', 45.249374, 4.694872),
      new Club(
        'ALLIANCE TENNIS RHODANIEN',
        'http://www.alliancetennisrhodanien.fr',
        45.425706,
        4.774894
      )
    ];
  }
  buildFeatures(): Array<Feature> {
    const features = new Array<Feature>();
    this.clubs.forEach(club => {
      const iconFeature = new Feature({
        geometry: new geom.Point(fromLonLat([club.lon, club.lat])),
        name: club.nom,
        currentClub: club
      });
      features.push(iconFeature);
    });

    return features;
  }
  unselectAllClubs(): void {
    this.clubs.forEach(club => {
      club.isSelected = false;
    });
  }

  ngOnInit() {
    const currentComponent: ClubsComponent = this;
    const features = this.buildFeatures();
    // const iconFeature = new Feature({
    //   geometry: new geom.Point(fromLonLat([this.clubs[0].lon, this.clubs[0].lat])),
    //   name: this.clubs[0].nom
    // });
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: features
      }),
      style: new Style({
        image: new Icon(
          /** @type {module:ol/style/Icon~Options} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.95,
            src: 'assets/tennis.png'
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

    const element = document.getElementById('popup');

    const popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    });
    myMap.addOverlay(popup);

    // display popup on click
    myMap.on('click', function(evt) {
      const feature = myMap.forEachFeatureAtPixel(evt.pixel, function(foundFeature) {
        return foundFeature;
      });
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        const club: Club = feature.get('currentClub');
        const indexClub = currentComponent.clubs.findIndex(c => c.nom === club.nom);
        currentComponent.clubs[indexClub].isSelected = true;
        currentComponent.unselectAllClubs();
        currentComponent.clubs[indexClub].isSelected = true;
      } else {
        currentComponent.unselectAllClubs();
      }
    });
  }
}
