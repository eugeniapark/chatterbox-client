//MVC View
var RoomsView = {

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
  RoomsView.$select.prepend(template); 
  }

};
