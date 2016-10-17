
var controller = {
	getTodos: function(){
		return collections.getRecord("todos");
	},
	saveTodos: function(data){
		collections.saveData("todos", data);
	},
	addTodo: function(todoText){
		console.log(this.getTodos());
		var data = this.getTodos().push({
	        todoText: todoText,
	        completed: false,
	        labelText: "",
	        labelColor: "",
	        priority: 0
	      });
		this.saveTodos(data);
	},
	deleteTodo: function(todo){
		var data = this.getTodos().splice(todo, 1);
		this.saveTodos(data);
	},
	editTodo: function(){

	},
	toggleCompleted: function(){

	},
	toggleAll: function(){

	},
	fireNotification: function() {

	},
	bindEvents: function(){
		var self = this;
		self.todos.addEventListener('click', function(e){
	        var clicked = e.target;
	        if ( clicked.id === "toggle" ) {
	          self.toggleAll();
	        }
	        if ( clicked.className === "deleteButton") {
	          self.deleteTodo(+clicked.parentNode.id);
	        }
	        if ( clicked.className === "check") {
	          self.toggleCompleted(+clicked.parentNode.id);
	        }
	        if ( clicked.id === "add" ) {
	          self.addTodo(self.addtodo.value);
	          self.addtodo.value = "";
	        }
	        view.render();
	    });
	    self.todos.addEventListener('keyup', function(e){
	        var pressed = e.keyCode;
	        if ( pressed === 13 && e.target.type === "text") {
	          self.addTodo(e.target.value);
	          e.target.value = "";
	        }
	    	view.render();
	    });
	},
	init: function(){
		this.todos = document.getElementById('todos');
	    this.list = document.querySelector("ul");
	    this.addtodo = document.getElementById("addtodo");

		collections.init();
		this.bindEvents();
		view.init();
	}

};

controller.init();