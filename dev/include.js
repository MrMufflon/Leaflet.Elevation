(function() {
    var localScripts = [
        "L.Control.Elevation.js",
        "../lib/leaflet-gpx/gpx.js"
    ];

    function getSrcUrl() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].src;
            if (src) {
                var res = src.match(/^(.*)include\.js$/);
                if (res) {
                    return res[1] + '../src/';
                }
            }
        }
    }

    var query = window.location.href.split("?")[1];
    var version = "0.7.2";
    if (query) {
        var params = query.split("=");
        if (params[0] === "leaflet") {
            version = params[1];
        }
    }
    document.writeln("<link rel='stylesheet' href='http://cdn.leafletjs.com/leaflet-" + version + "/leaflet.css'/>");
    document.writeln("<!--[if lte IE 8]><link rel='stylesheet' href='http://cdn.leafletjs.com/leaflet-" + version + "/leaflet.ie.css' /><![endif]-->");
    document.writeln("<script type='text/javascript' src='http://cdn.leafletjs.com/leaflet-" + version + "/leaflet-src.js'></script>");

    var path = getSrcUrl();
    for (var i = 0; i < localScripts.length; i++) {
        document.writeln("<script src='" + path + localScripts[i] + "'></script>");
    }
})();