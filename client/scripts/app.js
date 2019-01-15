var App = {

  $spinner: $('.spinner img'),
  lastId: '',
  username: 'anonymous',

  currentRoom: 'lobby',
  lastMsg: '',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    setInterval(App.fetch, 5000);
  },

  fetch: function(callback = () => {}) {
    Parse.readAll(({results}) => {   //{results} same as allTheData.results
      // examine the response from the server request:
      let messages = [];
      for (let i = 0; i < 10; i++) {
        let currentMsg = results[i];
        if (App.lastId === currentMsg.objectId) {
          i = 10;
        } else {
          messages.push(currentMsg);   
        } 
      }
      for (let x = messages.length - 1; x >= 0; x--) {
        let message = results[x];
        App.lastId = message.objectId;
        MessagesView.renderMessage(message);
      }
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
