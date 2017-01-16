(function() {

  Todooblr.controller = {

    getTodos: function() {
      return Todooblr.collections.getRecord("todos")
    },

    saveTodos: function(data) {
      Todooblr.collections.saveData("todos", data)
    },

    getLevel: function() {
      return Todooblr.collections.getRecord("userSettings").level
    }

    taskComplete: function(level, chapter) {
      var currentLevel = Todooblr.collections.getRecord("userSettings").level
      var currentChapter = Todooblr.collections.getRecord("userSettings").chapter

      // check if the task is relevant to the current level:chapter
      if (level === currentLevel && chapter === currentChapter) {
        Todooblr.achievements.doRequiredLevelUp()
      }
    },

    addTodo: function(todoText) {
      var data = this.getTodos()
      data.push({
        todoText: todoText,
        completed: false,
        labelText: "",
        labelColor: "",
        priority: 0,
        edit: false
      })
      this.saveTodos(data)
      this.taskComplete(1, 1)
    },

    toggleEdit: function(todo) {
      var data = this.getTodos()
      data[todo].edit = !data[todo].edit
      this.saveTodos(data)
    },

    updateTodo: function(todo, todoText) {
      var data = this.getTodos()
      if (data[todo].todoText !== todoText) {
        this.taskComplete(1, 3)
      }
      data[todo].todoText = todoText
      this.saveTodos(data)
    },

    deleteTodo: function(todo) {
      var data = this.getTodos()
      data.splice(todo, 1)
      this.saveTodos(data)
      this.taskComplete(1, 1)
    },

    toggleCompleted: function(todo) {
      var data = this.getTodos()
      data[todo].completed = !data[todo].completed
      this.saveTodos(data)
      this.taskComplete(1, 2)
    },

    toggleAll: function() {
      var data = this.getTodos()
      var allComplete = data.every(function(todo) {
        return todo.completed
      })
      data.forEach(function(todo) {
        todo.completed = allComplete ?
          false :
          true
      })
      this.saveTodos(data)
      if (!allComplete) {
        this.taskComplete(1, 2)
      }
    },

    validateInput: function(todoText) {
      return todoText.length < 1 ?
        false :
        true
    },

    bindEvents: function() {

      var self = this

      self.todos.addEventListener('click', function(e) {

        var clicked = e.target

        if (clicked.id === "toggle") {
          self.toggleAll()
          Todooblr.view.render()
        }

        if (clicked.id === "add") {
          if (self.validateInput(self.addtodo.value)) {
            self.addTodo(self.addtodo.value)
            self.addtodo.value = ""
            self.addtodo.placeholder = ""
            Todooblr.view.render()
          } else {
            self.addtodo.placeholder = "You must enter a value"
          }
        }

        if (clicked.className === "check") {
          self.toggleCompleted(+clicked.parentNode.id)
          Todooblr.view.render()
        }

        if (clicked.className === "todo-text") {
          self.toggleEdit(+clicked.parentNode.id)
          Todooblr.view.render()
        }

        if (clicked.className === "delete-button") {
          self.deleteTodo(+clicked.parentNode.id)
          Todooblr.view.render()
        }
      })

      self.todos.addEventListener('keyup', function(e) {
        var pressed = e.keyCode
        if (pressed === 13) { // return/enter
          if (e.target === self.addtodo) {
            if (self.validateInput(self.addtodo.value)) {
              self.addTodo(self.addtodo.value)
              self.addtodo.value = ""
              e.target.placeholder = ""
              Todooblr.view.render()
            } else {
              e.target.placeholder = "You must enter a value"
            }
          }
          if (e.target.className === "todo-text editable") {
            if (self.validateInput(e.target.value)) {
              self.updateTodo(e.target.parentNode.id, e.target.value)
              self.toggleEdit(+e.target.parentNode.id)
              e.target.placeholder = ""
              Todooblr.view.render()
            } else {
              e.target.placeholder = "You must enter a value"
            }
          }
        }
      })
    },

    init: function() {

      this.main = document.getElementById("main")
      this.todos = document.getElementById("todos")
      this.list = document.querySelector("ul")
      this.addtodo = document.getElementById("addtodo")
      this.encouragementImg = document.getElementById("encouragement-img")
      this.title = document.getElementById("title")

      Todooblr.collections.init()
      this.bindEvents()
      Todooblr.view.init()

    }

  }

  Todooblr.controller.init()

})()
