import Leaflet from 'leaflet';

import 'proj4leaflet/lib/proj4-compressed.js';
import 'proj4leaflet/src/proj4leaflet.js';

const crs = new L.Proj.CRS('EPSG:900913',
    '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
        resolutions: function() {
            let res = [];
            res[0] = Math.pow(2, 18);
            for (let i = 1; i < 19; i++) {
                res[i] = Math.pow(2, (18 - i))
            }
            return res;
        }(),
        origin: [0, 0],
        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
    });

const map = L.map('leafletMap', {
    center: [39.915052, 116.403954],
    zoom: 15,
    crs: crs
});

new L.TileLayer('http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518', {
    maxZoom: 18,
    minZoom: 3,
    subdomains: [0, 1, 2],
    attribution: 'ⓒ 2012 Daum',
    tms: true
}).addTo(map);
//导出map对象，外部文件使用
export default map;