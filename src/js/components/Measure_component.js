import 'leaflet-measure/dist/leaflet-measure.css';
// import 'leaflet-measure/dist/leaflet-measure.js';
import 'leaflet-measure/dist/leaflet-measure.de_CH.js';

import map from './BaiduMap';

map.measureControl = true;

map.on('measurefinish', function(evt) {
    writeResults(evt);
});

const measureControl = new L.Control.Measure({
    position: 'topright',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares',
    activeColor: '#ABE67E',
    completedColor: '#C8F2BE',
    className: 'leaflet-measure-resultpopup',
    autoPanPadding: [10, 10],
    captureZIndex: 10000
});
measureControl.addTo(map);

function writeResults(results) {
    document.getElementById('eventoutput').innerHTML = JSON.stringify({
            area: results.area,
            areaDisplay: results.areaDisplay,
            lastCoord: results.lastCoord,
            length: results.length,
            lengthDisplay: results.lengthDisplay,
            pointCount: results.pointCount,
            points: results.points
        },
        null,
        2
    );
}