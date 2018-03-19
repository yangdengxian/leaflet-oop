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
        remove: false,
        buffer: {
            replacePolylines: false,
            separateBuffer: false,
        }
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
});

function unionPolygon() {
    var layers = editableLayers.getLayers();
    var wktArray = [];

    layers.forEach(layer => {
        wktArray.push(Util.GeoJSONToWkt(layer.toGeoJSON(), map));
    });
    var param = {
        geometry1: wktArray[0],
        geometry2: wktArray[1]
    };
    $.ajax({
        url: urlObj.union_url,
        data: param,
        type: "GET",
        success: function(result) {
            if (result && result["result"]["geometry"]) {
                var geoJSON = Util.wktToGeoJSON(result["result"]["geometry"]);
                editableLayers.clearLayers();
                L.geoJSON(geoJSON, {
                    style: function(feature) {
                        return { color: "#000" };
                    }
                }).addTo(map);
            }
        },
        error: function(error) {
            console.error(error);
        }
    })
}

function cutPolygon() {
    map.pm.addControls({
        drawMarker: false,
        drawPolygon: true,
        editPolygon: false,
        drawPolyline: false,
        deleteLayer: true,
    });
}