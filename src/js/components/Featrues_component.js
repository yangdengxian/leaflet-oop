/**
 * 要素编辑
 */
import 'leaflet-draw/src/leaflet.draw.css';
import 'leaflet-draw/src/Leaflet.draw.js';
import 'leaflet-draw/src/Leaflet.Draw.Event.js';
import 'leaflet-draw/src/Toolbar.js';
import 'leaflet-draw/src/Tooltip.js';
import 'leaflet-draw/src/ext/GeometryUtil.js';
import 'leaflet-draw/src/ext/LatLngUtil.js';
import 'leaflet-draw/src/ext/LineUtil.Intersect.js';
import 'leaflet-draw/src/ext/Polygon.Intersect.js';
import 'leaflet-draw/src/ext/Polyline.Intersect.js';
import 'leaflet-draw/src/ext/TouchEvents.js';
import 'leaflet-draw/src/draw/DrawToolbar.js';
import 'leaflet-draw/src/draw/handler/Draw.Feature.js';
import 'leaflet-draw/src/draw/handler/Draw.SimpleShape.js';
import 'leaflet-draw/src/draw/handler/Draw.Polyline.js';
import 'leaflet-draw/src/draw/handler/Draw.Marker.js';
import 'leaflet-draw/src/draw/handler/Draw.Circle.js';
import 'leaflet-draw/src/draw/handler/Draw.CircleMarker.js';
import 'leaflet-draw/src/draw/handler/Draw.Polygon.js';
import 'leaflet-draw/src/draw/handler/Draw.Rectangle.js';
import 'leaflet-draw/src/edit/EditToolbar.js';
import 'leaflet-draw/src/edit/handler/EditToolbar.Edit.js';
import 'leaflet-draw/src/edit/handler/EditToolbar.Delete.js';
import 'leaflet-draw/src/Control.Draw.js';
import "leaflet-draw/src/edit/handler/Edit.Poly.js";
import "leaflet-draw/src/edit/handler/Edit.SimpleShape.js";
import "leaflet-draw/src/edit/handler/Edit.Rectangle.js";
import "leaflet-draw/src/edit/handler/Edit.Marker.js";
import "leaflet-draw/src/edit/handler/Edit.CircleMarker.js";
import "leaflet-draw/src/edit/handler/Edit.Circle.js";
import map from './BaiduMap';

let editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);
const options = {
    position: 'topright',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
                color: 'red'
            }
        },
        circle: false, // Turns off this drawing tool
        rectangle: {
            shapeOptions: {
                clickable: false
            }
        }
    },
    edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: false
    }
};

const drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

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

export default editableLayers;