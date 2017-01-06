(function(){

  var todos = [];
  
  var userSettings = {
    level: 1,
    chapter: 1,
    recycleBinAvailable: false,
    labelsAvailable: false,
    priorityAvailable: false
  };

  var gameSettings = {
    1: {
      1: {
        requiredTodos: 3,
        encouragements: [
          "i need %d %mtask%s added and i need them yesterday!",
          "you owe me %d %mtask%s! stat!", 
          "create %d %mtask%s if you want to keep your job!"
        ],
      },
      2: {
        requiredComplete: 3,
        encouragements: [
          "good employee! now mark them as complete."
        ],
      },
      3: {
        requiredAltered: 1,
        encouragements: [
          "click on a task to rename it. it better be good."
        ],
      }
    },
  }

  Todooblr.collections = {
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
        this.saveData('todos', todos);
        this.saveData('userSettings', userSettings);
        this.saveData('gameSettings', gameSettings);
      }
    }
  };

})();