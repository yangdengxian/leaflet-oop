/**
 * esri WFS服务
 */
import 'esri-leaflet/dist/esri-leaflet-debug.js'
import map from './BaiduMap';
const esriLeaflet = require("esri-leaflet");

const server_url = "http://cloud.soundhw.com/arcgis/rest/services/busmap_test/MapServer";
/* const featureLayer = esriLeaflet.dynamicMapLayer(server_url, {
    url: server_url,
    opacity: 0.7
}); */

const envLayer = esriLeaflet.dynamicMapLayer({
    url: server_url,
    opacity: 0.8,
    layers: [0, 1, 2, 3, 4, 5]
}).addTo(map);