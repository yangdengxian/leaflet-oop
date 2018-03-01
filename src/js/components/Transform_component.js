/**
 * 坐标转换插件
 */
import map from './BaiduMap';

const crs = map.options.crs;

map.on('click', (evt) => {
    let coordInfoObj = {};
    coordInfoObj.latlng = evt.latlng;
    coordInfoObj.meters = crs.project(evt.latlng);
    coordInfoObj.pixel = crs.latLngToPoint(evt.latlng, map.getZoom());
    alert("经纬度坐标(lat,lon)：" + coordInfoObj.latlng + "\r\n" +
        "平面坐标(x,y)： " + coordInfoObj.meters + "\r\n" +
        "屏幕坐标(x,y)： " + coordInfoObj.pixel + "\r\n");
});