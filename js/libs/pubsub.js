(function(){

	Todooblr.pubsub = {

		subs: {},

		on: function( event, callback, context ) {
			if ( !this.subs.hasOwnProperty(event) ) this.subs[event] = [];
			this.subs[event].push({callback: callback, context: context});
		},

		off: function( event, callback ) {
			if ( !this.subs.hasOwnProperty(event) ) return;
			for (var i = this.subs[event].length - 1; i >= 0; i -= 1) {
			    if (this.subs[event][i].callback === callback) this.subs[event].splice(i,1);
			}
		},

		trigger: function(event) {
			if ( this.subs.hasOwnProperty(event) ) {
				for ( var i=0; i < this.subs[event].length; i++ ) {
					this.subs[event][i].callback.apply(this.subs[event][i].context, arguments);
				}
			}
		},

		init: function () {
			this.subs = {}
		}
	}

})()