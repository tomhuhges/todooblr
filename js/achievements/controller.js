Todooblr.achievements = (function(){

  function getData () {
    var userSettings = Todooblr.collections.getRecord("userSettings");
    var gameSettings = Todooblr.collections.getRecord("gameSettings");

    return {
      currentChapter: userSettings.chapter,
      totalChapters: gameSettings[userSettings.level].totalChapters,
      currentTask: userSettings.task ,
      totalTasks: gameSettings[userSettings.level][userSettings.chapter].totalTasks,
    }
  }

  function levelUpIsRequired () {
    var data = getData()
    console.log('levelUp: ', data)
    return data.currentChapter > data.totalChapters ? true : false
  }

  function chapterUpIsRequired () {
    var data = getData()
    console.log('levelUp: ', data)
    return data.currentTask === data.totalTasks ? true : false
  }

  function levelUp () {
    var userSettings = Todooblr.collections.getRecord("userSettings")
    userSettings.level++
    userSettings.chapter = 1 // reset chapter when levelling up
    Todooblr.collections.saveData("userSettings", userSettings)
    console.log('level up! - ' + userSettings.level + '.' + userSettings.chapter + '.' + userSettings.task)
  }

  function chapterUp () {
    var userSettings = Todooblr.collections.getRecord("userSettings")
    userSettings.chapter++
    userSettings.task = 0 // reset tasks when chaptering up
    Todooblr.collections.saveData("userSettings", userSettings)
    console.log('chapter up! - ' + userSettings.level + '.' + userSettings.chapter + '.' + userSettings.task)
  }

  function taskUp () {
    var userSettings = Todooblr.collections.getRecord("userSettings")
    userSettings.task = Todooblr.checkAchievements(userSettings.level, userSettings.chapter)
    Todooblr.collections.saveData("userSettings", userSettings)
    console.log('task up! - ' + userSettings.level + '.' + userSettings.chapter + '.' + userSettings.task)
  }

  function doRequiredLevelUp () {
    taskUp()
    if (chapterUpIsRequired()) chapterUp()
    if (levelUpIsRequired()) levelUp()
    Todooblr.pubsub.trigger('levelUpConfirmed')
	}

  return {
    doRequiredLevelUp: doRequiredLevelUp
  }

})()
