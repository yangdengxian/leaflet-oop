var Util = {
    project: function(layer, map) {
        let coordinatesMeters = [],
            geoJSONPbj = {},
            latlngs = layer.getLatLngs();
        latlngs[0].forEach(latlng => {
            let _xy = map.options.crs.project(latlng);
            coordinatesMeters.push({
                lat: _xy["y"],
                lng: _xy["x"]
            });
        });
        layer.setLatLngs([coordinatesMeters]);
        geoJSONPbj = layer.toGeoJSON();
        return geoJSONPbj;
    },
    unproject: function(geoJSON, map) {
        geoJSON["coordinates"][0].forEach(point => {
            let latlng = map.options.crs.unproject(L.point(point));
            point[0] = latlng["lng"];
            point[1] = latlng["lat"];
        });
        return geoJSON;
    },
    wktToGeoJSON: function(wktStr) {
        if (!wktStr || !wkx) {
            return;
        }
        return wkx.Geometry.parse(wktStr).toGeoJSON();
    },
    GeoJSONToWkt: function(geoJSON) {
        if (!geoJSON || !wkx) {
            return;
        }
        return wkx.Geometry.parseGeoJSON(geoJSON.geometry).toWkt();
    }
};