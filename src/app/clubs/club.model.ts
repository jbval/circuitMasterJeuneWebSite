import { UrlObject } from 'url';

export class Club {
  nom: string;
  sites: Array<ClubSite>;
  lat: any;
  lon: any;
  isSelected: boolean;
  constructor(nom: string, sites: Array<ClubSite>, lat, lon) {
    this.nom = nom;
    this.sites = sites;
    this.lat = lat;
    this.lon = lon;
    this.isSelected = false;
  }
}

export class ClubSite {
  siteName: string;
  url: string;
  /**
   *
   */
  constructor(siteName: string, url: string) {
    this.siteName = siteName;
    this.url = url;
  }
}
