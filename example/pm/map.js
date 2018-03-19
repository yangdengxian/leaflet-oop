/* eslint-disable */
// Provide your access token
const accessToken = 'pk.eyJ1IjoibWFwc29mc3VtaXQiLCJhIjoiY2l1ZDF3dHE5MDAxZDMwbjA0cTR3dG50eSJ9.63Xci-GKFikhAobboF0DVQ';

// set mapbox tile layer
const mapboxTiles1 = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    attribution: '&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});
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
const map = L.map('leafletmap')
    .setView([51.505, -0.09], 13)
    .addLayer(mapboxTiles1);

// add leaflet.pm controls to the map
map.pm.addControls(options);