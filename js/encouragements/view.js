(function(){

	Todooblr.encouragementView = {

		getCurrentMessage: function() {
			return Todooblr.encouragementController.getEncouragements()
		},

		render: function() {
			var message = this.getCurrentMessage()
			this.marquee.innerHTML = '<p>' + message + '</p>'
		},

		init: function() {
			this.marquee = document.querySelector('.marquee')
			this.render()
			Todooblr.pubsub.on('levelUpConfirmed', this.render, this)
		}

	}

})()
