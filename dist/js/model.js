'use strict';

var collections = {
	todos: [],
	settings: {
		imagesAvailable: false,
		labelsAvailable: false,
		priorityAvailable: false
	},
	getAllData: function getAllData() {
		return JSON.parse(localStorage);
	},
	getRecord: function getRecord(model) {
		return JSON.parse(localStorage[model]);
	},
	saveData: function saveData(model, data) {
		localStorage.setItem(model, JSON.stringify(data));
	},
	init: function init() {
		if (localStorage.length === 0) {
			this.saveData('todos', this.todos);
			this.saveData('settings', this.settings);
		}
	}
};