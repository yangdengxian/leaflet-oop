const wfs_url = "http://cloud.soundhw.com/arcgis/rest/services/busmap/MapServer/identify";

function queryWFS(geometry, latlng) {
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
    const url = wfs_url + L.Util.getParamString(param, wfs_url);
    const headers = new Headers({
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Origin": '*',
        "Access-Control-Allow-Origin": '*'
    });

    fetch(url).then((response) => {
            return response.json();
        })
        .then((myJson) => {
            getQueryWFSResult(myJson, latlng);
        }).catch((err) => {
            console.error(err);
        });
}

function getQueryWFSResult(result, latlng) {
    console.log(result);
    if (result.results.length === 0) {
        return;
    }
    let properties = result.results[0]["attributes"];
    let popupTemplate = "<h3>要素</h3>";
    for (let key in properties) {
        if (properties.hasOwnProperty(key)) {
            popupTemplate += key + "：" + properties[key] + " <br>";
        }
    }
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
    queryWFS(geometry, evt.latlng);
});