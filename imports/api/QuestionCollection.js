import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const QuestionCollection = new Mongo.Collection("questions");
QuestionCollection.schema = new SimpleSchema({
  title: { type: String },
  content: { type: String },
  upvotes: { type: SimpleSchema.Integer },
  downvotes: { type: SimpleSchema.Integer },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});
QuestionCollection.schema.validate({
  userId: "bcv67Ck82xdMrPumr",
  title: "Hello World",
  content: "good mork=ning world",
  upvotes: 10,
  downvotes: 1,
});
