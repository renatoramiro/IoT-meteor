Schema = {};

Temperature = new Mongo.Collection("temperature");

Schema.Temp = new SimpleSchema({
  value: {
    type: Number,
    decimal: true
  },
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			}
    }
	},
  user_id: {
    type: String,
  },
  username: {
    type: String
  }
});

Temperature.attachSchema(Schema.Temp);
