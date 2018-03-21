import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import map from './BaiduMap';
L.Control.geocoder().addTo(map);
// L.Routing.control({
//     waypoints: [
//         L.latLng(39.909212, 116.434056),
//         L.latLng(39.745608, 116.549578)
//     ]
// }).addTo(map);