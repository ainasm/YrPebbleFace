/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var View = require('view');
var Wakeup = require('wakeup');
//var Accel = require('ui/accel');

var Location = require('location');
var Yr = require('yr');

var next = null;

View.initView();

runRefresh();

/*Accel.on('tap', function(e) {
	//console.log('tap: ' + JSON.stringify(e));
  console.log('Tap event on axis: ' + e.axis + ' and direction: ' + e.direction);
	runRefresh();
});
Accel.on('data', function(e) {
	//console.log('data: ' + JSON.stringify(e));
  console.log('Data event on axis: ' + e.axis + ' and direction: ' + e.direction);
	console.log('Accel data: ' + JSON.stringify(e.accels));
	console.log('Accel data: ' + JSON.stringify(e.accel));
	//runRefresh();
});*/

function runRefresh() {
	if (next !== null) {
		Wakeup.cancel(next);
	}
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
				if (e.error == "range" || e.error == "invalidArgument") {
					if (next !== null) {
						Wakeup.cancel(next);
					}
					scheduleUpdate(minutes+5);
				}
			} else {
				next = e.id;
				runRefresh();
			}
		}
	);
}
