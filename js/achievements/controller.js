Todooblr.achievements = (function(){

  function getData () {
    var userSettings = Todooblr.collections.getRecord("userSettings")
    var gameSettings = Todooblr.collections.getRecord("gameSettings")

    return {
      currentChapter: userSettings.chapter,
      totalChapters: gameSettings[userSettings.level].totalChapters,
      currentTask: userSettings.task,
      totalTasks: gameSettings[userSettings.level][userSettings.chapter].totalTasks,
    }
  }

  function levelUpIsRequired () {
    var data = getData()
    return data.currentChapter > data.totalChapters ? true : false
  }

  function chapterUpIsRequired () {
    var data = getData()
    return data.currentTask === data.totalTasks ? true : false
  }

  function levelUp () {
    var userSettings = Todooblr.collections.getRecord("userSettings")
    userSettings.level++
    userSettings.chapter = 1 // reset chapter when levelling up
    Todooblr.collections.saveData("userSettings", userSettings)
  }

  function chapterUp () {
    var userSettings = Todooblr.collections.getRecord("userSettings")
    userSettings.chapter++
    userSettings.task = 0 // reset tasks when chaptering up
    Todooblr.collections.saveData("userSettings", userSettings)
  }

  function taskUp () {
    var userSettings = Todooblr.collections.getRecord("userSettings")
    userSettings.task = Todooblr.checkAchievements(userSettings.level, userSettings.chapter)
    Todooblr.collections.saveData("userSettings", userSettings)
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
