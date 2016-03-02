describe('L.Control.Elevation', function() {
    it('formatts numbers correctly', function() {
        var el = new L.control.elevation();
        expect(el._formatter(2.34567, 3, ",")).toEqual("2,346");
        expect(el._formatter(2.34567, 1, ".")).toEqual("2.3");
        expect(el._formatter(-2.34567, 1, "#")).toEqual("-2#3");
    });
});

describe('L.Control.Elevation', function() {
    it('adds LineString GeoJSON data correctly', function() {
        var el = new L.control.elevation();
        var geojson = {
            "name": "NewFeatureType",
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [169.13693, -44.696476, 296],
                        [169.134602, -44.69764, 295],
                        [169.129983, -44.701164, 299]
                    ]
                },
                "properties": null
            }]
        };
        el._addData(geojson);
        expect(el._data.length).toEqual(3);
        var item = el._data[0];
        expect(item.x).toEqual(169.13693);
        expect(item.y).toEqual(-44.696476);
        expect(item.altitude).toEqual(296);
        expect(item.dist).toEqual(0);
        expect(el._data[2].dist).toEqual(0.76138);
    });
});

describe('L.Control.Elevation', function() {
    it('adds MultiLineString GeoJSON data correctly', function() {
        var el = new L.control.elevation();
        var geojson = {
            "name": "NewFeatureType",
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "MultiLineString",
                    "coordinates": [
                        [
                            [169.13693, -44.696476, 296],
                            [169.134602, -44.69764, 295],
                            [169.129983, -44.701164, 299]
                        ],
                        [
                            [19.13693, -44.696476, 12],
                            [19.134602, -44.134602, 34],
                            [19.129983, -44.701164, 13]
                        ]
                    ]
                },
                "properties": null
            }]
        };
        el._addData(geojson);
        expect(el._data.length).toEqual(6);
        var item = el._data[0];
        expect(item.x).toEqual(169.13693);
        expect(item.y).toEqual(-44.696476);
        expect(item.altitude).toEqual(296);
        expect(item.dist).toEqual(0);
        expect(el._data[2].dist).toEqual(0.76138);
        var item4 = el._data[4];
        expect(item4.x).toEqual(19.134602);
        expect(item4.y).toEqual(-44.134602);
        expect(item4.altitude).toEqual(34);
    });
});

describe('L.Control.Elevation', function() {

    var el = new L.control.elevation();

    window.baseUrl = window.baseUrl || ".";
    beforeEach(function(done) {
        var g = new L.GPX(baseUrl + "/test.gpx", {
            async: true
        });
        g.on("addline", function(e) {
            el._addData(e.line);
            done();
        });
    });

    it('adds GPX data correctly', function(done) {


        expect(el._data.length).toEqual(9);
        var item1 = el._data[0];
        expect(item1.y).toEqual(-45.842434);
        expect(item1.x).toEqual(170.651075);
        expect(item1.altitude).toEqual(-18);

        var item3 = el._data[2];
        expect(item3.y).toEqual(-45.842444);
        done();

    });
});

describe('L.Control.Elevation', function() {
    it('clears data to initial state', function() {
        var el = new L.control.elevation();
        var geojson = {
            "name": "NewFeatureType",
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [169.13693, -44.696476, 296],
                        [169.134602, -44.69764, 295],
                        [169.129983, -44.701164, 299]
                    ]
                },
                "properties": null
            }]
        };
        el._addData(geojson);
        el._clearData();
        expect(el._data).toEqual(null);
        expect(el._dist).toEqual(null);
        expect(el._maxElevation).toEqual(null);
    });
});

describe('L.Control.Elevation', function() {
    it('adds calculates imperial units correctly', function() {
        var el = new L.control.elevation({
            imperial: true
        });
        var geojson = {
            "name": "NewFeatureType",
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [169.13693, -44.696476, 296],
                        [169.134602, -44.69764, 295],
                        [169.129983, -44.701164, 299]
                    ]
                },
                "properties": null
            }]
        };
        el._addData(geojson);
        expect(el._data.length).toEqual(3);
        var item = el._data[0];
        //expect(item.x).toEqual(169.13693);
        //expect(item.y).toEqual(-44.696476);
        expect(item.altitude).toEqual(971.12864);
        expect(item.dist).toEqual(0);

        item = el._data[1];
        expect(item.altitude).toEqual(967.8478);
        expect(el._data[2].dist).toEqual(0.47311000000000003);
    });
});

describe('L.Control.Elevation', function() {
    var el = new L.control.elevation();
    it('calculates the datas extent', function() {
        var geojson = {
            "name": "NewFeatureType",
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [169.13693, -44.23, 296],
                        [169.134602, -44.69764, 295],
                        [169.129983, -44.701164, 299],
                        [167.83, -44.81164, 29]
                    ]
                },
                "properties": null
            }]
        };

        el._addData(geojson);
        var data = el._data;
        var ext = el._calculateFullExtent(data);
        expect(ext.getWest()).toEqual(167.83);
        expect(ext.getNorth()).toEqual(-44.23);
        expect(ext.getEast()).toEqual(169.13693);
        expect(ext.getSouth()).toEqual(-44.81164);
    });
    it('throws error on empty data extent calculation', function() {
        var threwError = false;
        try {
            el._calculateFullExtent([])
        } catch (e) {
            threwError = true;
        }
        expect(threwError).toEqual(true);
        threwError = false;
        try {
            el._calculateFullExtent()
        } catch (e) {
            threwError = true;
        }
        expect(threwError).toEqual(true);
    });
});
