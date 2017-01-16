Todooblr.notificationsView = (function() {

  var container = document.getElementById('notification')

  function showNotification() {
    var notification = document.createElement('div')
    notification.innerText = 'An update is required.'

    var button = document.createElement('button')
    button.innerText = 'Update'
    button.id = 'update'

    notification.appendChild(button)
    container.appendChild(notification)
  }

  function hideNotification() {
    container.classList.toggle('hidden')
    setTimeout(function() {
      container.innerHTML = ''
      container.classList.toggle('hidden')
    }, 1000)
  }

  function bindEvents() {
    container.addEventListener('click', function(e) {
      e.preventDefault()
      var clicked = e.target
      if (e.target.id === 'update') {
        hideNotification()
        Todooblr.achievements.doRequiredLevelUp()
        var level = Todooblr.collections.getRecord("userSettings").level
        Todooblr.controller.changeStyle(level)
      }
    })
  }

  bindEvents()

  return {
    show: showNotification,
    hide: hideNotification
  }

})()
