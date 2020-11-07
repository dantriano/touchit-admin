
declare const google: any;

const strokeColor = '#ff004c';
const fillColor = '#ff004c';
const overFillColor = '#333333';
const overStrokeColor = '#ffffff';

export class MapsService {
  center: any = {
    lat: 33.5362475,
    lng: -111.9267386
  };
  map: any;
  poligon: any;
  points: any;
  poligons: any[] = [];
  drawingManager: any;
  constructor(map) {
    this.map = map
  }
  //Delte selected zones
  overZone(polygon, inn) {
    polygon.setOptions({ fillColor: (inn) ? overFillColor : fillColor, strokeColor: (inn) ? overStrokeColor : strokeColor });
  }

  getDrawingManager() {
    return this.drawingManager;
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
  //Draw the current areas
  loadPoligons(zone) {
    var path = [];
    if (!zone) return
    zone.latsLngs.forEach(element => {
      path.push(new google.maps.LatLng(element.lat, element.lng))
    });
    let poligon = new google.maps.Polygon({
      strokeColor: strokeColor,
      fillColor: fillColor,
      map: this.map,
      strokeOpacity: 1.0,
      strokeWeight: 5,
      paths: path,
    });
    this.poligons.push(poligon);
  }

  setCurrentPosition(){
    if ("geolocation" in navigator) { 
    navigator.geolocation.getCurrentPosition((position) => { 
      this.center.lat = position.coords.latitude;
      this.center.lng = position.coords.longitude;
      this.map.setCenter(this.center);
      //this.getLocationAddress() 
    }, failure => {  
        this.map.setZoom(2);
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
