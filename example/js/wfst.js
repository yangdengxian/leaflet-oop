var startPoint = [39.915052, 116.403954];
var map = L.map('leafletMap', {
        editable: true
    }).setView(startPoint, 16),
    tilelayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { maxZoom: 20, attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT' }).addTo(map);
L.EditControl = L.Control.extend({

    options: {
        position: 'topleft',
        callback: null,
        kind: '',
        html: ''
    },

    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
            link = L.DomUtil.create('a', '', container);

        link.href = '#';
        link.title = 'Create a new ' + this.options.kind;
        link.innerHTML = this.options.html;
        L.DomEvent.on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', function() {
                window.LAYER = this.options.callback.call(map.editTools);
            }, this);

        return container;
    }

});

L.NewLineControl = L.EditControl.extend({

    options: {
        position: 'topleft',
        callback: map.editTools.startPolyline,
        kind: 'line',
        html: '\\/\\'
    }

});

L.NewPolygonControl = L.EditControl.extend({

    options: {
        position: 'topleft',
        callback: map.editTools.startPolygon,
        kind: 'polygon',
        html: '▰'
    }

});

L.NewMarkerControl = L.EditControl.extend({

    options: {
        position: 'topleft',
        callback: map.editTools.startMarker,
        kind: 'marker',
        html: '🖈'
    }

});

L.NewRectangleControl = L.EditControl.extend({

    options: {
        position: 'topleft',
        callback: map.editTools.startRectangle,
        kind: 'rectangle',
        html: '⬛'
    }

});

L.NewCircleControl = L.EditControl.extend({

    options: {
        position: 'topleft',
        callback: map.editTools.startCircle,
        kind: 'circle',
        html: '⬤'
    }

});

map.addControl(new L.NewMarkerControl());
map.addControl(new L.NewLineControl());
map.addControl(new L.NewPolygonControl());
map.addControl(new L.NewRectangleControl());
map.addControl(new L.NewCircleControl());

const wfstPointOptions = {
    crs: L.CRS.EPSG4326,
    showExisting: true,
    geometryField: 'Shape',
    url: `http://192.168.231.97:8080/geoserver/businessdata/wfs`,
    typeNS: 'businessdata',
    typeName: 'businessdata:so_station',
    maxFeatures: 50,
    opacity: 1,
    style: function(layer) {
        // you can use if statemt etc
        return {
            color: 'black',
            weight: 1
        }
    },
};
const wfstPoint = new L.WFST(wfstPointOptions, new L.Format.GeoJSON({
    crs: L.CRS.EPSG4326,
    pointToLayer(geoJsonPoint, latlng) {
        const layer = new L.CircleMarker(latlng, {
            radius: 10,
        });
        return layer;
    },
}));
wfstPoint.addTo(map);

map.on('editable:created', function(e) {
    wfstPoint.addLayer(e.layer);
});

map.on('editable:editing', function(e) {
    wfstPoint.editLayer(e.layer);
});

map.on('editable:delete', function(e) {
    wfstPoint.removeLayer(e.layer);
});

L.easyButton('fa-save', function() {
    wfstPoint.save();
}, 'Save changes');