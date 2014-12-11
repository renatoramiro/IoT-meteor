Template.myTemp.helpers({
  firstTemp: function(){
    return this.fetch()[0];
  },

  temperatures: function(){
    return this.fetch().slice(1,5);
  }
});

Template.myTempUsername.helpers({
  firstTemp: function(){
    return this.fetch()[0];
  },

  temperatures: function(){
    return this.fetch().slice(1,5);
  }
});
