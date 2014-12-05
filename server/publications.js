Meteor.publish('temperatures', function (id) {
	return Temperature.find({user_id: 'he4GsJMkEKvQBBT2c'});
});

Meteor.publish('my-temperature', function (id) {
	return Temperature.find({user_id: id});
});