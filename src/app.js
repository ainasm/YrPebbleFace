/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var View = require('view');
var Wakeup = require('wakeup');

var Location = require('location');
var Yr = require('yr');

View.initView();

runRefresh();

function runRefresh() {
	Location.refreshLocation(Yr.refreshWeather);
	Location.refreshLocation(Location.getCurrentPlace);
	scheduleUpdate(30);
}

function scheduleUpdate(minutes) {
	Wakeup.schedule({time: (Date.now() / 1000) + (minutes * 60)},
		function(e) {
			if (e.failed) {
				// Log the error reason
				console.log('Wakeup error: ' + JSON.stringify(e));
				scheduleUpdate(30);
			} else {
				runRefresh();
			}
		}
	);
}
