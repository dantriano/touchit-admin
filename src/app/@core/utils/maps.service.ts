
declare const google: any;

const strokeColor = '#ff004c';
const fillColor = '#ff004c';
const overFillColor = '#333333';
const overStrokeColor = '#777777';

export class MapsService {
  center: any = {
    lat: 33.5362475,
    lng: -111.9267386
  };
  zoom: any = 16;
  map: any;
  poligon: any;
  points: any;
  poligons: any[] = [];
  drawingManager: any;
  constructor() {this.setCurrentPosition(); }
  setMap(map) {
    this.map = map
    this.map.setCenter(this.center);
    this.map.setZoom(15);
  }
  selectZone(i) {
    this.poligons.forEach((e,index) => e.setOptions({ fillColor: (i==index) ? overFillColor : fillColor, strokeColor: (i==index) ? overStrokeColor : strokeColor }));
  }
  goZone(i) {
    this.map.setCenter(this.poligons[i].getPath().getAt(0));
  }
  getDrawingManager() {
    return this.drawingManager;
  }

  //Load the Drawing manager
  initDrawingManager() {

    const options = {
      map: this.map,
      drawingControl: false,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      polygonOptions: {
        draggable: false,
        strokeColor: strokeColor,
        fillColor: fillColor,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
  }

  //IF position is in any of the designed areas for this location
  containsLocation(myPosition, areas) {
    let isIn = false;
    areas.forEach(element => {
      if (google.maps.geometry.poly.containsLocation(myPosition, element.overlay)) {
        isIn = true;
        console.log('inn');
      }
    });
    return isIn;
  }

  areaToPoligon(area) {
    var path = [];
    if (area && area.latsLngs)
      area.latsLngs.forEach(element => {
        path.push(new google.maps.LatLng(element.lat, element.lng))
      });
      this.addPoligon(this.drawPoligon(path))
  }

  addPoligon(poligon) {
    this.poligons.push(poligon);
  }
  deletePoligon(index) {
    if (this.poligons[index]) {
      this.poligons[index].setMap(null);
      this.poligons.splice(index, 1);
    }
  }
  resetPoligon() {
    this.poligons.forEach(e => e.setMap(null));
    this.poligons=[];
  }
  //Draw the current areas
  drawPoligon(path) {
    return new google.maps.Polygon({
      strokeColor: strokeColor,
      fillColor: fillColor,
      map: this.map,
      strokeOpacity: 1.0,
      strokeWeight: 5,
      paths: path,
    });
  }

  setCurrentPosition(){
    if ("geolocation" in navigator) { 
    return navigator.geolocation.getCurrentPosition((position) => { 
      this.center.lat = position.coords.latitude;
      this.center.lng = position.coords.longitude;
      return this.center
    }, failure => {  
            switch (failure.code) {
              case 3:// ...deal with timeout
                break;
              case 2:// ...device can't get data
                break;
              case 1:// ...user said no (PERMISSION_DENIED)
            }
        }); 
      }   
    }
}
