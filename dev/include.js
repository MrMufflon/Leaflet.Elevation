(function() {
	var scripts = [
			"L.Control.Elevation.js"
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

	var path = getSrcUrl();
	for (var i = 0; i < scripts.length; i++) {
		document.writeln("<script src='" + path + scripts[i] + "'></script>");
	}
})();