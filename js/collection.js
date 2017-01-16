(function(){

  var todos = []

  var userSettings = {
    level: 1,
    chapter: 1,
    task: 0,
    // recycleBinAvailable: false,
    // labelsAvailable: false,
    // priorityAvailable: false
  }

  var gameSettings = {
    1: {
      totalChapters: 3,
      1: {
        totalTasks: 3,
        encouragements: [
          "i need %d %mtask%s added and i need %t yesterday!",
          "you owe me %d %mtask%s! stat!",
          "create %d %mtask%s if you want to keep your job!"
        ],
      },
      2: {
        totalTasks: 3,
        encouragements: [
          "good employee! now mark them as complete."
        ],
      },
      3: {
        totalTasks: 1,
        encouragements: [
          "click on a task to rename it. it better be good."
        ],
      },
      4: {
        totalTasks: 0
      },
    },
    2: {
      totalChapters: 3,
      1: {
        totalTasks: 1,
        encouragements: [
          "our systems need an update!"
        ]
      },
      2: {
        totalTasks: 1,
        encouragements: [
          "it looks like you're trying to delete a todo."
        ]
      }
    }
  }

  Todooblr.collections = {
    getAllData: function(){
      return JSON.parse(localStorage)
    },
    getRecord: function(model){
      return JSON.parse(localStorage[model])
    },
    saveData: function(model, data){
      localStorage.setItem(model, JSON.stringify(data))
    },
    init: function(){
      if ( localStorage.length === 0 ) {
        this.saveData('todos', todos)
        this.saveData('userSettings', userSettings)
        this.saveData('gameSettings', gameSettings)
      }
    }
  }

})()
