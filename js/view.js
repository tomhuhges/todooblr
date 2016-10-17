

var view = {

	createTodoItem: function(todo){

		var listItem = document.createElement('li');
		listItem.className = "todo-item";

		var check = document.createElement('span');
		check.className = "check";
		check.textContent = todo.completed ? "(✔) " : "( ) ";

		if ( todo.edit ) {
			// make text an input if `edit` prop is true
			var text = document.createElement('input');
			text.className = "todo-text editable";
			text.type = "text";
			text.value = todo.todoText;
		} else {
			var text = document.createElement('span');
			text.className = "todo-text";
			text.textContent = todo.todoText;
		}

		var deleteButton = document.createElement('button');
		deleteButton.textContent = "x";
		deleteButton.className = "delete-button";

		listItem.appendChild(check);
		listItem.appendChild(text);
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

      //var editable = document.querySelector(".editable");
      //if (editable) editable.focus();

	},

	init: function() {
		this.render();
	}
	

};