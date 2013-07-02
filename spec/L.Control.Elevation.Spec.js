describe('L.Control.Elevation', function() {
	it('formatts numbers correctly', function() {
		var el = new L.control.elevation();
		expect(el._formatter(2.34567, 3, ",")).toEqual("2,346");
		expect(el._formatter(2.34567, 1, ".")).toEqual("2.3");
	});
});

describe('L.Control.Elevation', function() {
	it('adds GeoJSON data correctly', function() {
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
				}
			]
		};
		el._addData(geojson);
		expect(el._data.length).toEqual(3);
		var item = el._data[0];
		expect(item.x).toEqual(169.13693);
		expect(item.y).toEqual(-44.696476);
		expect(item.altitude).toEqual(296);
		expect(item.dist).toEqual(0);
		expect(el._data[2].dist).toEqual(0.7613852871901096);
	});
});