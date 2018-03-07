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
        L.polygon(e.layer.getLatLngs()).addTo(editableLayers);
    }

    editableLayers.addLayer(layer);
});
/* 
var drawState = null;

function changeMethod(method) {
    var drawState = new L.Clipper[method](map, {
        featureGroup: editableLayers,
        selectedPathOptions: {
            color: '#FF3399'
        }
    });
    drawState.enable();
    resetButtons();
    document.getElementById(method).style.borderStyle = 'inset';
}

function resetButtons() {
    ['AND', 'OR', 'XOR', 'NOT'].map(function(method) {
        document.getElementById(method).style.borderStyle = 'outset';
    });
} */


/* const PMControl = new L.Control.PMButton({
    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: true, // adds button to draw markers
    drawPolyline: true, // adds button to draw a polyline
    drawRectangle: true, // adds button to draw a rectangle
    drawPolygon: true, // adds button to draw a polygon
    drawCircle: true, // adds button to draw a cricle
    cutPolygon: true, // adds button to cut a hole in a polygon
    editMode: true, // adds button to toggle edit mode for all layers
    removalMode: true, // adds a button to remove layers
});
PMControl.addTo(map); */