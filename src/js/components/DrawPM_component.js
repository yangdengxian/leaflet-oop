// import 'leaflet.pm/dist/leaflet.pm.min.js';
import 'leaflet.pm/dist/leaflet.pm.css';
import map from './BaiduMap';
const leafletPM = require("leaflet.pm");

// define toolbar options
const options = {
    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: true, // adds button to draw markers
    drawPolyline: true, // adds button to draw a polyline
    drawRectangle: true, // adds button to draw a rectangle
    drawPolygon: true, // adds button to draw a polygon
    drawCircle: true, // adds button to draw a cricle
    cutPolygon: true, // adds button to cut a hole in a polygon
    editMode: true, // adds button to toggle edit mode for all layers
    removalMode: true, // adds a button to remove layers
};
console.log(map.pm);