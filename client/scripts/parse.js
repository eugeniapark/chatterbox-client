var Parse = {  //Interacts w/ Server

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function(message, successCB, errorCB = null) {    // POSTS: saves a message to the server -->
    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        successCB ();
        console.log ('chatterbox: Message Sent')
      },
      error: function (error) {
        errorCB ();
        console.error('chatterbox: Failed to fetch messages', error);
        }
    });
  },

  readAll: function(successCB, errorCB = null) {  //GET: receives info <-- Server
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};