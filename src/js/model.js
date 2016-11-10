var collections = {
	todos: [],
	settings: {
		imagesAvailable: false,
		labelsAvailable: false,
		priorityAvailable: false
	},
	getAllData: function(){
		return JSON.parse(localStorage);
	},
	getRecord: function(model){
		return JSON.parse(localStorage[model]);
	},
	saveData: function(model, data){
		localStorage.setItem(model, JSON.stringify(data));
	},
	init: function(){
		if ( localStorage.length === 0 ) {
			this.saveData('todos', this.todos);
			this.saveData('settings', this.settings);
		}
	}
};