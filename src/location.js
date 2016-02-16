var ajax = require('ajax');
var View = require('view');
var Vibe = require('ui/vibe');

var Location = {
	locationOptions : {
		enableHighAccuracy: true, 
		maximumAge: 10000, 
		timeout: 10000
	},

/*	locationSuccess : function(pos) {
		console.log('locationSuccess: lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
	},

	locationError : function(err) {
  	console.log('location error (' + err.code + '): ' + err.message);
	},*/

	refreshLocation : function(successCallback) {
		navigator.geolocation.getCurrentPosition(successCallback, this.locationError, this.locationOptions);
	},
	
	getCurrentPlace :	function (pos) {
		var location = View.getLocation();
		var KEY = 'AIzaSyBTsjSo-Wvez0M484VSDnXWKoOT0i2kfKk';
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + '&key=' + KEY;
		//console.log(url);
		ajax({url: url, type: 'json'},
			function(data, status, request) {
				//console.error("Result: " + JSON.stringify(data));
				var locality;
				var sublocality;
				var i, j, k, l;
				var address_component;
				for (i = 0; i < data.results.length; i++) { 
					var result = data.results[i];
					//console.log("results=" + JSON.stringify(result));
					for (j = 0; j < result.types.length; j++) { 
						//console.log("result.type=" + result.types[j]);
						if (result.types[j] == "sublocality") {
							for (k = 0; k < result.address_components.length; k++) { 
								address_component = result.address_components[k];
								for (l = 0; l < address_component.types.length; l++) { 
									//console.log("  address_component.type=" + address_component.types[l]);
									if (address_component.types[l] == "sublocality") {
										sublocality = address_component.short_name;
										//console.log("sublocality=" + sublocality);
									} else if (address_component.types[l] == "locality") {
										locality = address_component.short_name;
										//console.log("locality=" + locality);
									}
								}
							}
							//console.log("break");
							i = data.results.length+1;
							j = result.types.length+1;
							break;
						} else if (result.types[j] == "locality") {
							for (k = 0; k < result.address_components.length; k++) { 
								address_component = result.address_components[k];
								for (l = 0; l < address_component.types.length; l++) { 
									//console.log("  address_component.type=" + address_component.types[l]);
									if (address_component.types[l] == "locality") {
										sublocality = address_component.short_name;
										//console.log("sublocality=" + sublocality);
									} else if (address_component.types[l] == "administrative_area_level_1") {
										locality = address_component.short_name;
										//console.log("locality=" + locality);
									}
								}
							}
							//console.log("break");
							i = data.results.length+1;
							j = result.types.length+1;
							break;
						}
					}
				}
				var vibrate = false;
				if (sublocality + ", " + locality != location) {
					vibrate = true;
				}
				location = sublocality + ", " + locality;
				//console.log(location);
				View.setLocation(location);
				if (vibrate) {
					Vibe.vibrate('short');
				}
			},
			function(error, status, request) {
				View.setLocation(location);
				//console.error("Got error: " + JSON.stringify(error));
				//console.error(error.status);
				//console.error(error.error);
				//console.error(status);
				//console.error(JSON.stringify(request));
				//console.log('The ajax request failed: ' + error);
			}
		);
	}

};
this.exports = Location;
