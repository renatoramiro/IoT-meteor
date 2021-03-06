Router.configure({
  layoutTemplate: 'application'
});

Router.map(function(){
	this.route('home', {
		path: '/',
		// waitOn: function(){return Meteor.subscribe('temperatures')},
	});

	this.route('myTemp', {
		path: '/my-temp/:_id',
		waitOn: function(){return Meteor.subscribe('my-temperature', this.params._id)},
		data: function(){ return Temperature.find({user_id: this.params._id}, {sort: {createdAt: -1}, limit: 5})}
	});

	this.route('myTempUsername', {
		path: '/:username',
		waitOn: function(){return Meteor.subscribe('my-temperature-with-username', this.params.username)},
		data: function(){ return Temperature.find({username: this.params.username}, {sort: {createdAt: -1}, limit: 5})}
	});

	this.route('/temperature/:user_id/:token/:value', {where: 'server'})
  .get(function () {
  	var token = this.params.token;
	  var user_id = this.params.user_id;
	  var value = this.params.value;
	  var user = Meteor.users.findOne({_id: user_id, 'profile.token': token});
	  if (user) {
	  	Temperature.insert({user_id: user_id, username: user.username, value: value});
    	this.response.end('Requisição correta\n');
      if(Temperature.find({user_id: user_id}).count() >= 1000){
        var lista = Temperature.find({user_id: user_id}, {fields: {_id: 1}, limit: 500}).map(function(doc){ return doc._id});
        Temperature.remove({_id: {$in: lista}});
      }
	  } else {
	  	this.response.end("Requisição incorreta\n");
	  }
  });
  // .post(function () {
  //   this.response.end('post request\n');
  // });
});
