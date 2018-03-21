/**
 * esri WFS服务
 */
import 'esri-leaflet/dist/esri-leaflet-debug.js'
import map from './BaiduMap';

const server_url = "http://cloud.soundhw.com/arcgis/rest/services/busmap_test/FeatureServer/0";
const featureLayer = L.esri.featureLayer({
    url: server_url,
    pointToLayer: function(geojson, latlng) {
        return L.circleMarker(latlng);
    },
    style: {
        color: '#5B7CBA',
        weight: 2,
        opacity: 0.85,
        fillOpacity: 0.5
    }
}).addTo(map);