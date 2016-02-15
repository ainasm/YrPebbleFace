var UI = require('ui');
var Vector2 = require('vector2');

var View = {
	window : null,
	symbol : null,
	symbolValue : "refreshing",
	temperature : null,
	temperatureValue : "...",
	location : null,
	locationValue : "...",
	
	initView : function() {
		// Create the Window
		this.window = new UI.Window({
			fullscreen: true,
		});

		// 144 x 168

		// Create TimeText
		var timeText = new UI.TimeText({
			position: new Vector2(0, 18),
			size: new Vector2(144, 30),
			text: "%H:%M",
			font: 'bitham-42-bold',
			color: 'white',
			textAlign: 'center'
		});
		var dateText = new UI.TimeText({
			position: new Vector2(0, 68),
			size: new Vector2(144, 15),
			text: "%a %d",
			font: 'gothic-18-bold',
			color: 'white',
			textAlign: 'center'
		});

		// Add the TimeText
		this.window.add(timeText);
		this.window.add(dateText);

		// Create a background Rect
		var bgRect = new UI.Rect({
			position: new Vector2(0, 104),
			size: new Vector2(144, 64),
			backgroundColor: 'white'
		});

		// Add Rect to Window
		this.window.add(bgRect);

		this.symbol = new UI.Image({
			position: new Vector2(24, 105),
			size: new Vector2(36, 53),
			image: 'images/w_refreshing.png',
			backgroundColor: 'clear' 
		});
		this.window.add(this.symbol);

		this.temperature = new UI.Text({
			position: new Vector2(72, 110),
			size: new Vector2(57, 36),
			text: "...",
			font: 'gothic-28-bold',
			color: 'black',
			textAlign: 'right'
		});
		this.window.add(this.temperature);
		
		this.location = new UI.Text({
			position: new Vector2(0, 148),
			size: new Vector2(144, 20),
			text: "...",
			font: 'gothic-14',
			color: 'black',
			textAlign: 'center'
		});
		this.window.add(this.location);

		// Show the Window
		this.window.show();
	},
		
	setSymbol : function(value) {
		this.symbol.image('images/w_'+value+'.png');
		this.symbolValue = value;
	},
	getSymbol : function() {
		return this.symbolValue;
	},
	
	setTemperature : function(value) {
		if (value === null) {
			this.temperature.text("...");
		} else {
			this.temperature.text(value + "°C");
			this.temperatureValue = value;
		}
	},
	getTemperature : function() {
		return this.temperatureValue;
	},

	setLocation : function(value) {
		if (value === null) {
			this.location.text("...");
		} else {
			this.location.text(value);
			this.locationValue = value;
		}
	},
	getLocation : function() {
		return this.locationValue;
	},

	
};
this.exports = View; 
