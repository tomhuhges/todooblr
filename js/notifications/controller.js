Todooblr.notifications = (function() {

  var currentLevel = Todooblr.collections.getRecord("userSettings").level

  function notificationShouldFire() {
    var latestLevel = Todooblr.collections.getRecord("userSettings").level
    if (latestLevel !== currentLevel) {
      currentLevel++
      return true
    }
    return false
  }

  function fireNotification() {
    if (notificationShouldFire()) {
      Todooblr.notificationsView.show()
    }
  }

  function init() {
    Todooblr.pubsub.on('levelUpConfirmed', fireNotification)
  }

  init()

})()
