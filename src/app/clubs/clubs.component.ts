import { Component, OnInit } from '@angular/core';
import { Club, ClubSite } from './club.model';
import * as leaflet from 'leaflet/dist/leaflet.js';
// import { Map, View } from 'ol';
// import Feature from 'ol/Feature';
// import * as geom from 'ol/geom';
// import OSM from 'ol/source/OSM';
// import { fromLonLat } from 'ol/proj';
// import { defaults as defaultControls, ZoomToExtent } from 'ol/control.js';

// import Overlay from 'ol/Overlay.js';
// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
// import { Vector as VectorSource } from 'ol/source.js';
// import { Fill, Icon, Stroke, Style } from 'ol/style.js';

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
    this.clubs = [
      new Club(
        'TC VIENNE',
        [new ClubSite('Accéder au site du club', 'http://www.tennisclubvienne.fr')],
        45.502689,
        4.84779
      ),

      new Club(
        'TC RAMBERTOIS',
        [new ClubSite('Accéder au site du club', 'http://www.tennis-saint-rambert.fr')],
        45.299349,
        4.819858
      ),
      new Club(
        'TC PONT-EVEQUE',
        [new ClubSite('Accéder au site du club', 'http://tcpe.net')],
        45.531927,
        4.925397
      ),
      new Club(
        'TC SAMAURITAIN',
        [new ClubSite('Accéder au site du club', 'http://tennisclubsamauritain.com')],
        45.396481,
        4.769996
      ),
      new Club(
        'TC ROUSSILLON',
        [new ClubSite('Accéder au site du club', 'http://www.club.fft.fr/tennisclubroussillon')],
        45.363439,
        4.804456
      ),
      new Club(
        'TC LA SANNE',
        [new ClubSite('Accéder au site du club', 'http://www.club.fft.fr/tc.lasanne/')],
        45.385333,
        4.888573
      ),
      new Club(
        'TC PEAGE DE ROUSSILLON',
        [new ClubSite('Accéder au site du club', 'http://www.club.fft.fr/peage.de.roussillon')],
        45.367499,
        4.791359
      ),
      new Club(
        'TC CLONAS-CHAVANAY',
        [
          new ClubSite('Accéder au site du club de Clonas', 'https://tcclonas.fr'),
          new ClubSite('Accéder au site du club de Chavanay', 'http://www.club.fft.fr/tc.chavanay ')
        ],
        45.413298,
        4.786129
      ),
      new Club(
        'TC ANNONAY',
        [new ClubSite('Accéder au site du club', 'http://tennisclubannonay.com')],
        45.249374,
        4.694872
      ),
      new Club(
        'ALLIANCE TENNIS RHODANIEN',
        [new ClubSite('Accéder au site du club', 'http://www.alliancetennisrhodanien.fr')],
        45.425706,
        4.774894
      )
    ];
  }

  unselectAllClubs(): void {
    this.clubs.forEach(club => {
      club.isSelected = false;
    });
  }
  initMarkers(map: any): void {
    const ballIcon = leaflet.icon({
      iconUrl: 'assets/tennis.png',
      iconAnchor: [16, 37],
      popupAnchor: [0, -37]
    });
    this.clubs.forEach(club => {
      const marker = leaflet
        .marker([club.lat, club.lon], {
          icon: ballIcon
        })
        .addTo(map);
      let popupTemplate = `
      <div class="card-body">
      <h5 class="card-body-title"><i class="fas fa-address-card"></i> ${club.nom}</h5>`;
      club.sites.forEach(site => {
        popupTemplate = `${popupTemplate}<a href="${
          site.url
        }" class="card-link" target="_blank"><i class="fas fa-link"></i>&nbsp;${
          site.siteName
        }</a><br/>`;
      });
      marker.bindPopup(popupTemplate, {
        maxWidth: '380'
      });
      marker.bindTooltip(club.nom);
    });
  }
  initMap(): void {
    const currentMap = leaflet.map(this.targetElement).setView([45.385227, 4.861188], 10);
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(currentMap);
    this.initMarkers(currentMap);
  }
  ngOnInit() {
    this.initMap();
  }
}
