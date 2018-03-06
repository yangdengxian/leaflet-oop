const esri_url = "http://cloud.soundhw.com/arcgis/rest/services/busmap/MapServer";

L.esri.dynamicMapLayer({
    url: esri_url,
    opacity: 0.25,
    useCors: false
}).addTo(map);