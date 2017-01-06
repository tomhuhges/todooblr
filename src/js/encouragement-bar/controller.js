(function(){

	Todooblr.encouragementController = {

		getEncouragements: function() {
			var level = Todooblr.collections.getRecord("userSettings").level;
			var chapter = Todooblr.collections.getRecord("userSettings").chapter;
			var encouragements = Todooblr.collections.getRecord("gameSettings")[level][chapter].encouragements;
			var encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

			//return Toodooblr.libs.formatEncouragement(encouragement, level);

			if ( level === 1 ) {
				if ( chapter === 1 ) {
					var requiredTodos = Todooblr.collections.getRecord('gameSettings')[level][chapter].requiredTodos;
					var todosLength = Todooblr.collections.getRecord("todos").length;
					var todosLeft = (requiredTodos - todosLength)+'';
					var more = todosLeft == requiredTodos ? '' : 'more ';
					var s = (requiredTodos - todosLength) == 1 ? '' : 's';
					encouragement = encouragement.replace('%d', todosLeft )
						.replace('%m', more)
						.replace('%s', s);
				}
				
			}
			
			return encouragement;
		},

		init: function() {
			Todooblr.encouragementView.init()
		}
	}

	Todooblr.encouragementController.init();

})();