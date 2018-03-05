/**
 * 缓冲区分析
 */
import map from './BaiduMap';
const wkx = require("wkx");

const service_url = "http://192.168.232.225:3001/buffer";
const PI = Math.PI;

function query(geoJSON) {
    const wktStr = wkx.Geometry.parseGeoJSON(geoJSON.geometry).toWkt();
    const obj = {
        geometry: wktStr,
        distance: 100
    };
    const url = service_url + L.Util.getParamString(obj, service_url);
    fetch(url).then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson["result"] && myJson["result"]["geometry"]) {
                getQueryResult(myJson["result"]["geometry"]);
            }

        }).catch((err) => {
            console.error(err);
        });
}

function getQueryResult(geometry) {
    let geoJSON = wkx.Geometry.parse(geometry).toGeoJSON();
    geoJSON["coordinates"][0].forEach(point => {
        let latlng = map.options.crs.unproject(L.point(point));
        point[0] = latlng["lng"];
        point[1] = latlng["lat"];
    });
    L.geoJSON(geoJSON, {
        style: function(feature) {
            return { color: "#000" };
        }
    }).addTo(map);
}

map.on(L.Draw.Event.CREATED, (e) => {
    let type = e.layerType,
        layer = e.layer,
        latlngs = e.layer.getLatLngs(),
        geoJSONPbj = e.layer.toGeoJSON();
    switch (type) {
        case "polygon":
            //自相交面暂时不在此范围内，有待优化
            // console.log(L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0]));
            let coordinatesMeters = [];
            latlngs[0].forEach(latlng => {
                let _xy = map.options.crs.project(latlng);
                coordinatesMeters.push({
                    lat: _xy["y"],
                    lng: _xy["x"]
                });
            });
            layer.setLatLngs([coordinatesMeters]);
            geoJSONPbj = e.layer.toGeoJSON();
            query(geoJSONPbj);
            break;

        case "point":

            break;
        case "polyline":
            //自相交面暂时不在此范围内，有待优化
            let points = [];
            geoJSONPbj.geometry.coordinates.forEach(point => {
                let pint = L.point(point[0], point[1]);
                points.push(pint);
            });

            let lines = L.LineUtil.simplify(points, 10);
            L.polyline(lines, {
                color: 'red'
            }).addTo(map);
            break;
    }

});