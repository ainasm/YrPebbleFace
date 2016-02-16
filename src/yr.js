var ajax = require('ajax');
var View = require('view');
var Vibe = require('ui/vibe');

var Yr = {
	refreshWeather : function(pos) {
		var symbol = View.getSymbol();
		View.setSymbol("refreshing");
		var temperature = View.getTemperature();
		View.setTemperature(null);
		//console.log('yr: lat=' + pos.coords.latitude + ',lon=' + pos.coords.longitude);
		//console.log(pos);
		ajax({url: 'http://api.yr.no/weatherapi/locationforecast/1.9/?lat=' + pos.coords.latitude + ';lon=' + pos.coords.longitude, type: 'text'},
			function(data, status, request) {
				var vibrate = false;
				//console.error("Result: " + JSON.stringify(data));
				//console.log('Quote of the day is: ' + data.contents.quote);
				var reT = /<temperature id="TTT" unit="celsius" value="(.*)"\/>/; 
				var mT = data.match(reT);
				if (mT[1] != symbol) {
					vibrate = true;
				}
				//console.log("temp=" + mT[1]);
				View.setTemperature(mT[1]);
				var reS = /<symbol id="(.*)" number="(.*)"\/>/; 
				var mS = data.match(reS);
				//console.log("symbol=" + mS[2]);
				if (mS[2] != symbol) {
					vibrate = true;
				}
				// TODO: get daytime/nighttime
				// http://api.yr.no/weatherapi/sunrise/1.0/?lat=71.0;lon=-69.58;date=2016-02-16
				// https://www.dropbox.com/sh/soitnjrmbe75sug/AACoEAkiWwKTPJnJwReCY1QAa?dl=0
				View.setSymbol(mS[2]);
				//console.log(data.product[0].time[0].location.temperature);
				if (vibrate) {
					Vibe.vibrate('short');
				}
			},
			function(error, status, request) {
				View.setSymbol(symbol);
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
this.exports = Yr;
