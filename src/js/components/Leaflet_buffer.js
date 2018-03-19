/* global L */
/* eslint-disable import/no-extraneous-dependencies */
require('leaflet');
require('leaflet/dist/leaflet.css');
require('leaflet-draw');
require('leaflet-draw/dist/leaflet.draw.css');
require('../src/leaflet.buffer.js');


const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
    position: 'topright',
    draw: {
        polyline: {
            metric: true,
        },
        polygon: {
            allowIntersection: false,
            showArea: true,
            drawError: {
                color: '#b00b00',
                timeout: 1000,
            },
            shapeOptions: {
                color: '#00c0de',
            },
        },
        circle: {
            shapeOptions: {
                color: '#662d91',
            },
        },
        marker: false,
    },
    edit: {
        featureGroup: drawnItems,
        remove: true,
        buffer: {
            replacePolylines: false,
            separateBuffer: true,
        },
    },
});
map.addControl(drawControl);

map.on('draw:created', (e) => {
    const { layerType, layer } = e;

    if (layerType === 'marker') {
        layer.bindPopup('A popup!');
    }

    drawnItems.addLayer(layer);
});