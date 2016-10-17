

var view = {

	createTodoItem: function(todo){

		var listItem = document.createElement('li');

		var check = document.createElement('span');
		check.className = "check";
		check.textContent = todo.completed ? "(✔)" : "( )";

		listItem.textContent = " " + todo.todoText;
		listItem.insertBefore(check, listItem.firstChild);

		var deleteButton = document.createElement('button');
		deleteButton.textContent = "x";
		deleteButton.className = "deleteButton";
		listItem.appendChild(deleteButton);

		return listItem;

    },

    createLabel: function() {

    },

	render: function() {

      controller.list.innerHTML = "";
      var todos = controller.getTodos();

      todos.forEach(function(todo, i){

      	var newtodo = this.createTodoItem(todo);
        newtodo.id = i;
        controller.list.appendChild(newtodo);

      }, this);

	},

	init: function() {
		this.render();
	}
	

};