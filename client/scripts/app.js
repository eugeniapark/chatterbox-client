var App = {  //Application -- *gets invoked end of index.html after script loads

  $spinner: $('.spinner img'),
  lastId: '',
  username: 'anonymous',

  currentRoom: 'lobby',
  lastMsg: '',

  initialize: function() {  //Initializes App components
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    
    $('#rooms button').on('click', function(){
      let room = {
        username: App.username,
        text: `new room called ${$('#message').val()} created`,
        roomname: $('#message').val()
      };
      RoomsView.renderRoom(room);
    });

    $('#rooms button').click(function() {
      RoomsView.addRoom(); 
    })
    RoomsView.$select.on('change', function () {
      $('#chats').empty();
      MessagesView.initialize(Messages, RoomsView.$select.val());
    })
    
    
    setInterval(App.fetch, 5000);  //*updates every 5 seconds

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
