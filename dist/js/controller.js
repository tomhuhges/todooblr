"use strict";

var controller = {

	getTodos: function getTodos() {
		return collections.getRecord("todos");
	},

	saveTodos: function saveTodos(data) {
		collections.saveData("todos", data);
	},

	addTodo: function addTodo(todoText) {
		var data = this.getTodos();
		data.push({
			todoText: todoText,
			completed: false,
			labelText: "",
			labelColor: "",
			priority: 0,
			edit: false
		});
		this.saveTodos(data);
	},

	toggleEdit: function toggleEdit(todo) {
		var data = this.getTodos();
		data[todo].edit = !data[todo].edit;
		this.saveTodos(data);
	},

	updateTodo: function updateTodo(todo, todoText) {
		var data = this.getTodos();
		data[todo].todoText = todoText;
		this.saveTodos(data);
	},

	deleteTodo: function deleteTodo(todo) {
		var data = this.getTodos();
		data.splice(todo, 1);
		this.saveTodos(data);
	},

	toggleCompleted: function toggleCompleted(todo) {
		var data = this.getTodos();
		data[todo].completed = !data[todo].completed;
		this.saveTodos(data);
	},

	toggleAll: function toggleAll() {
		var data = this.getTodos();
		var allComplete = data.every(function (todo) {
			return todo.completed;
		});
		data.forEach(function (todo) {
			todo.completed = allComplete ? false : true;
		});
		this.saveTodos(data);
	},

	validateInput: function validateInput(todoText) {
		return todoText.length < 1 ? false : true;
	},

	fireNotification: function fireNotification() {},

	bindEvents: function bindEvents() {

		var self = this;

		self.todos.addEventListener('click', function (e) {

			var clicked = e.target;

			if (clicked.id === "toggle") {
				self.toggleAll();
				view.render();
			}

			if (clicked.id === "add") {

				if (self.validateInput(self.addtodo.value)) {
					self.addTodo(self.addtodo.value);
					self.addtodo.value = "";
					self.addtodo.placeholder = "";
					view.render();
				} else {

					self.addtodo.placeholder = "You must enter a value";
				}
			}

			if (clicked.className === "check") {

				self.toggleCompleted(+clicked.parentNode.id);
				view.render();
			}

			if (clicked.className === "todo-text") {
				self.toggleEdit(+clicked.parentNode.id);
				view.render();
			}

			if (clicked.className === "delete-button") {
				self.deleteTodo(+clicked.parentNode.id);
				view.render();
			}
		});

		self.todos.addEventListener('keyup', function (e) {
			var pressed = e.keyCode;
			if (pressed === 13) {
				// return/enter
				if (e.target === self.addtodo) {
					if (self.validateInput(self.addtodo.value)) {
						self.addTodo(self.addtodo.value);
						self.addtodo.value = "";
						e.target.placeholder = "";
						view.render();
					} else {
						e.target.placeholder = "You must enter a value";
					}
				}
				if (e.target.className === "todo-text editable") {
					if (self.validateInput(e.target.value)) {
						self.updateTodo(e.target.parentNode.id, e.target.value);
						self.toggleEdit(+e.target.parentNode.id);
						e.target.placeholder = "";
						view.render();
					} else {
						e.target.placeholder = "You must enter a value";
					}
				}
			}
		});
	},

	init: function init() {

		this.todos = document.getElementById('todos');
		this.list = document.querySelector("ul");
		this.addtodo = document.getElementById("addtodo");

		collections.init();
		this.bindEvents();
		view.init();
	}

};

controller.init();