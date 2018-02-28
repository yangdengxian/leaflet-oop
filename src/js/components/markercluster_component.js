//MarkerCluster
import 'leaflet.markercluster/example/screen.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster-src.js';
//引入map对象
import map from './BaiduMap';

//MarkerCluster
let markers = new L.MarkerClusterGroup();

function populate() {
    for (let i = 0; i < 100; i++) {
        let m = new L.Marker(getRandomLatLng(map));
        markers.addLayer(m).addTo(map);
    }
    return false;
}

function getRandomLatLng(map) {
    let bounds = map.getBounds(),
        southWest = bounds.getSouthWest(),
        northEast = bounds.getNorthEast(),
        lngSpan = northEast.lng - southWest.lng,
        latSpan = northEast.lat - southWest.lat;
    return new L.LatLng(
        southWest.lat + latSpan * Math.random(),
        southWest.lng + lngSpan * Math.random());
}
populate();