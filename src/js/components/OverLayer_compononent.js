import map from './BaiduMap';
import '../lib/leaflet.styleLayer/css/styledLayerControl.css';
import '../lib/leaflet.styleLayer/src/styledLayerControl.js';

// markerGroup
var markerGroup = new L.LayerGroup();
L.marker([39.926478, 116.341925]).addTo(markerGroup),
    L.marker([39.948164, 116.410053]).addTo(markerGroup),
    L.marker([39.887735, 116.399992]).addTo(markerGroup);

// lineGroup
var lineGroup = new L.LayerGroup();
L.polyline([
    [39.946062, 116.439661],
    [39.921941, 116.386913]
]).addTo(lineGroup);

// polygonGroup
var polygonGroup = new L.LayerGroup();
L.polygon([
    [39.935552, 116.35098],
    [39.94385, 116.37642],
    [39.929355, 116.368803],
    [39.926589, 116.357448]
]).addTo(polygonGroup);


var overlays = [{
    groupName: "markerGroup",
    expanded: true,
    layers: {
        "markerGroup": markerGroup
    }
}, {
    groupName: "lineGroup",
    expanded: true,
    layers: {
        "lineGroup": lineGroup
    }
}, {
    groupName: "polygonGroup",
    expanded: true,
    layers: {
        "polygonGroup": polygonGroup
    }
}];

markerGroup.StyledLayerControl = {
    removable: false,
    visible: true
}

lineGroup.StyledLayerControl = {
    removable: true,
    visible: false
}

polygonGroup.StyledLayerControl = {
    removable: true,
    visible: false
}

var options = {
    container_width: "300px",
    group_maxHeight: "80px",
    //container_maxHeight : "350px", 
    exclusive: false,
    collapsed: true,
    position: 'topright'
};

var control = L.Control.styledLayerControl(null, overlays, options);
map.addControl(control);

// test for adding new overlay layers dynamically
control.addOverlay(markerGroup, "markerGroup", {
    groupName: "markerGroup"
});

//control.removeLayer( corn_sp );

//control.removeGroup( "Rio de Janeiro");

control.selectLayer(markerGroup);
//control.unSelectLayer(corn_sp); 

control.selectGroup("markerGroup");