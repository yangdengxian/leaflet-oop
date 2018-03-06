/**
 * 面切割合并
 */
import editableLayers from './Featrues_component';
import map from './BaiduMap';
const ClipperLib = require("clipper-lib");
const Clipper = require("leaflet-clipper");

map.on(L.Draw.Event.CREATED, (e) => {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    if (type === "polygon") {
        //自相交面暂时不在此范围内，有待优化
        console.log(L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0]));
        L.polygon(e.layer.getLatLngs(), { color: 'red' }).addTo(map);
    }

    editableLayers.addLayer(layer);
});