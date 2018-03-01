/**
 * WFS服务
 */
import map from './BaiduMap';

const param = {
    f: 'json',
    tolerance: 3,
    returnGeometry: true,
    imageDisplay: '400,400,96',
    geometry: '{ "x": 117.41902544299899, "y": 32.932809572683865 }',
    geometryType: 'esriGeometryPoint',
    sr: 4326,
    mapExtent: '117.35246344718988,32.89558513242315,117.4383445528101,32.941592867576844',
    layers: top,
    layerDefs: { "0": "orgId='5774435465118079'", "1": "orgId='5774435465118079'", "2": "orgId='5774435465118079'", "3": "orgId='5774435465118079'" }
};
const server_url = "http://cloud.soundhw.com/arcgis/rest/services/busmap/MapServer/identify";
const url = server_url + L.Util.getParamString(param, server_url);
fetch(url, {
    method: 'GET'
}).then(function(response) {
    return response.json();
}).then(function(json) {
    getQueryResult(json);
}).catch(function(err) {
    console.error(err);
});

function getQueryResult(result) {
    console.log(json);
}
console.log(url);