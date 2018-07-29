export class Club {
  nom: String;
  site: String;
  lat: any;
  lon: any;
  isSelected: boolean;
  constructor(nom, site, lat, lon) {
    this.nom = nom;
    this.site = site;
    this.lat = lat;
    this.lon = lon;
    this.isSelected = false;
  }
}
