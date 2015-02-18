Leaflet.Elevation
=================

1. [What is this?](https://github.com/MrMufflon/Leaflet.Elevation#what-is-this)
2. [How to use](https://github.com/MrMufflon/Leaflet.Elevation#how-to-use)
3. [Install](https://github.com/MrMufflon/Leaflet.Elevation#install-with-bower)
4. [Setup development environment](https://github.com/MrMufflon/Leaflet.Elevation#setup-development-environment)
5. [Customizing styles](https://github.com/MrMufflon/Leaflet.Elevation#customizing-styles)

### What is this?
A [Leaflet](http://leafletjs.com) plugin to view an interactive height profile of polylines lines using [d3](http://d3js.org). This plugin is under development.

Supported and tested Browsers:
- Chrome
- Firefox
- IE 10+

Supported data:
- GeoJSON [Demo](http://mrmufflon.github.io/Leaflet.Elevation/example/example.html)
- GPX-files using [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx) [Demo](http://mrmufflon.github.io/Leaflet.Elevation/example/example_gpx.html)

*Tested with Leaflet 0.4+*

<img src="http://mrmufflon.github.io/Leaflet.Elevation/images/screen.jpg"/>

### Install with npm

`` npm install leaflet.elevation ``

### Install with Bower

`` bower install leaflet.elevation ``

### How to use
Altitude information for each point is necessary in the given data.
```javascript
//all used options are the default values
var el = L.control.elevation({
  	position: "topright",
	theme: "steelblue-theme", //default: lime-theme
	width: 600,
	height: 125,
	margins: {
		top: 10,
		right: 20,
		bottom: 30,
		left: 50
	},
	useHeightIndicator: true, //if false a marker is drawn at map position
	interpolation: "linear", //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
	hoverNumber: {
		decimalsX: 3, //decimals on distance (always in km)
		decimalsY: 0, //deciamls on height (always in m)
		formatter: undefined //custom formatter function may be injected
	},
	xTicks: undefined, //number of ticks in x axis, calculated by default according to width
	yTicks: undefined, //number of ticks on y axis, calculated by default according to height
	collapsed: false	//collapsed mode, show chart on click or mouseover
});
el.addTo(map);
L.geoJson(geojson,{
    onEachFeature: el.addData.bind(el) //working on a better solution
}).addTo(map);
```
```javascript
var el = L.control.elevation();
el.addTo(map);
var g=new L.GPX("./mytrack.gpx", {async: true});
g.on("addline",function(e){
	el.addData(e.line);
});
g.addTo(map);
```
```javascript
// reset data and display
el.clear();
```

### Setup development environment
If you are new to grunt please refer to the [quick start](http://gruntjs.com/getting-started) guide.

Install npm dependencies with
```
npm install
```

Run jasmine tests with
```
grunt test
```

And compile with
```
grunt
```

### Customizing styles
To generate different themes [lessCSS](http://lesscss.org/) is used. Create your own theme in a new .less file in src/css/themes. Usable variables are
```css
@theme : lime-theme;
@base-color : #9CC222; //basecolor to derive other colors from
@highlight-color : #637E0B; //basecolor to derive selections from
@background : fade(@base-color,20%); //background-color 
@drag-color : fade(@highlight-color,40%); //drag selection color
@axis-color : darken(@base-color,20%); //color of axes
@stroke-color : darken(@base-color,40%); //color for mouse highlight
@stroke-width-mouse-focus : 1; //stroke width for mouse highlight
@stroke-width-height-focus: 2; //stroke width for height focus indicator
@stroke-width-axis : 2; //stroke width for axes;
```
Add the theme file to the less- and cssmin task in the Gruntfile and you´re good to go.
