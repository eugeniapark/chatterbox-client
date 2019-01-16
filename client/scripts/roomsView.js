//MVC View
var RoomsView = {  //

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$select.on('change', Rooms.add);
    RoomsView.$button.on('click', Rooms.add);
  },

  renderRoom: function(roomName) {
    let template = `
      <option name=${roomName}>${roomName}</option>
  `
  RoomsView.$select.append(template); 
  },

  addRoom: function() {  //sends Server 
    RoomsView.renderRoom($('#message').val());  //bug: renders to chat
    let newMessage = {
      username: App.username,
      text: `new room called ${$('#message').val()} has been created`,
      roomname: $('#message').val()
    }

    Parse.create(newMessage, App.fetch);  //sends message to Server, gets info (messages) and renders
  }

};
