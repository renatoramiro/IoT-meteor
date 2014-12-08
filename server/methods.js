Meteor.methods({
  findUser: function(username){
    console.log(Meteor.users.findOne({username: username}, {field: {_id: 1, username: 1, profile: 1}})._id);
    return Meteor.users.find({username: username}, {field: {_id: 1, username: 1, profile: 1}}).fetch()[0]._id;
  }
});
