Todooblr.notifications = (function() {

  function notificationShouldFire() {
    var level = Todooblr.collections.getRecord("userSettings").level
    var chapter = Todooblr.collections.getRecord("userSettings").chapter
    return level !== 1 && chapter === 1 ? true : false
  }

  function fireNotification() {
    if (notificationShouldFire()) {
      Todooblr.notificationsView.show()
    }
  }

  function init() {
    fireNotification()
    Todooblr.pubsub.on('levelUpConfirmed', fireNotification)
  }

  init()

})()
