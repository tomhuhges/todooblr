(function() {

  Todooblr.encouragementController = {

    getEncouragements: function() {
      var level = Todooblr.collections.getRecord("userSettings").level
      var chapter = Todooblr.collections.getRecord("userSettings").chapter
      var encouragements = Todooblr.collections.getRecord("gameSettings")[level][chapter].encouragements
      var encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]

      //return Toodooblr.libs.formatEncouragement(encouragement, level)

      if (level === 1) {
        if (chapter === 1) {
          var totalTasks = Todooblr.collections.getRecord('gameSettings')[level][chapter].totalTasks
          var tasksDone = Todooblr.collections.getRecord('userSettings').task
          var tasksLeft = (totalTasks - tasksDone)
          var more = tasksLeft === totalTasks ?
            '' :
            'more '
          var plural = tasksLeft === 1 ?
            '' :
            's'
          var pronoun = tasksLeft === 1 ?
            'it' :
            'them'
          encouragement = encouragement.replace('%d', tasksLeft + '').replace('%m', more).replace('%s', plural).replace('%t', pronoun)
        }

      }

      return encouragement
    },

    init: function() {
      Todooblr.encouragementView.init()
    }
  }

  Todooblr.encouragementController.init()

})()
