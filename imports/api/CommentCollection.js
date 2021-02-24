import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const CommentCollection = new Mongo.Collection("comments");
CommentCollection.schema = new SimpleSchema({
  content: { type: String },
  upvotes: { type: SimpleSchema.Integer, defaultValue: 0, optional: true },
  downvotes: { type: SimpleSchema.Integer, defaultValue: 0, optional: true },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  questionId: { type: String, regEx: SimpleSchema.RegEx.Id },
  parentId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  level: SimpleSchema.Integer,
});
