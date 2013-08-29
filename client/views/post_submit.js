Template.postSubmit.events({
  'submit form': function(e) {
    console.log('Submitting Form');
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    };

       Meteor.call('post', post, function(error, id) {
       if (error) {
        // display the error to the user
       // alert(error.reason);
        throwError(error.reason);
         
       // if the error is that the post already exists, take us there
        if (error.error === 302)
          Meteor.Router.to('postPage', error.details)
      } else {
        Meteor.Router.to('postPage', id);
      }
     });
    //Meteor.Router.to('postPage', post);
  }
});