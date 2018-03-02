/**
 * 模仿 esri identity查询
 */
import map from './BaiduMap';

const server_url = "http://cloud.soundhw.com/arcgis/rest/services/busmap/MapServer/identify";

function query(geometry, latlng) {
    const param = {
        f: "json",
        tolerance: 1000,
        returnGeometry: true,
        imageDisplay: " 400,400,96",
        geometry: geometry,
        geometryType: "esriGeometryPoint",
        sr: 4326,
        mapExtent: "117.34354073491765, 32.89453950207875,117.42942184053787,32.940547237232444",
        layers: "top"
    };
    const url = server_url + L.Util.getParamString(param, server_url);
    fetch(url).then((response) => {
            return response.json();
        })
        .then((myJson) => {
            getQueryResult(myJson, latlng);
        }).catch((err) => {
            console.error(err);
        });
}

function getQueryResult(result, latlng) {
    console.log(result);
    if (result.results.length === 0) {
        return;
    }
    let properties = result.results[0]["attributes"];
    let popupTemplate = "<h3>要素名</h3>名称：{NAME} <br><small>编号: {BUSINESSID}<small>";
    let template = L.Util.template(popupTemplate, properties);
    L.popup()
        .setLatLng(latlng)
        .setContent(template)
        .openOn(map);
}
map.on('click', (evt) => {
    let geometry = JSON.stringify({
        x: evt.latlng.lng,
        y: evt.latlng.lat
    });
    query(geometry, evt.latlng);
});