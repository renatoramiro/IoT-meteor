Router.configure({
  layoutTemplate: 'application'
});

Router.map(function(){
	this.route('home', {
		path: '/',
		waitOn: function(){return Meteor.subscribe('temperatures')},
	});

	this.route('myTemp', {
		path: '/my-temp/:_id',
		waitOn: function(){return Meteor.subscribe('my-temperature', this.params._id)},
		data: function(){ return Temperature.find({user_id: this.params._id}, {sort: {createdAt: -1}, limit: 5})}
	});

	this.route('/temperature/:user_id/:token/:value', {where: 'server'})
  .get(function () {
  	var token = this.params.token;
	  var user_id = this.params.user_id;
	  var value = this.params.value;
	  if (Meteor.users.findOne({_id: user_id, 'profile.token': token})) {
	  	Temperature.insert({user_id: user_id, value: value});
    	this.response.end('Requisição correta\n');
	  } else {
	  	this.response.end("Requisição incorreta\n");
	  }
  });
  // .post(function () {
  //   this.response.end('post request\n');
  // });
});