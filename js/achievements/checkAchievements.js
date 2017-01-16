Todooblr.checkAchievements = (function(){

  var achievementRequirements = {
    1: {
      1: {
        tasksComplete: function() {
          return Todooblr.collections.getRecord('todos').length
        }
      },
      2: {
        tasksComplete: function() {
          return Todooblr.collections.getRecord('todos')
            .filter(function(todo){ return todo.completed })
            .length
        }
      },
      3: {
        tasksComplete: function() {
          return 1
        }
      }
    },
    2: {
      1: {
        tasksComplete: function() {
          return 1
        }
      }
    }
  }

  return function(level, chapter) {
    return achievementRequirements[level][chapter].tasksComplete()
  }

})()
