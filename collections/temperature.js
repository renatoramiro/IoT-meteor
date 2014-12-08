Schema = {};

Temperature = new Mongo.Collection("temperature");

Schema.Temp = new SimpleSchema({
  value: {
    type: Number,
    decimal: true
  },
  user_id: {
    type: String,
  },
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			}
    }
	},
});

Temperature.attachSchema(Schema.Temp);
