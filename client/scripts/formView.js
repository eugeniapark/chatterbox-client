var FormView = {

  $form: $('form'),
  $message: $('#message'), 

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    
    console.log('click!');
    let message = {
      username: App.username, 
      text: FormView.$message.val(),
      roomname: 'lobby',
    }
    FormView.$message.val('')
    Parse.create(message, App.fetch)
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};