import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { QuestionCollection } from "./QuestionCollection";

export const CommentCollection = new Mongo.Collection("commentsposted");
CommentCollection.schema = new SimpleSchema({
  content: { type: String },
  upvotes: { type: SimpleSchema.Integer, defaultValue: 0, optional: true },
  downvotes: { type: SimpleSchema.Integer, defaultValue: 0, optional: true },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  parentId: { type: String, regEx: SimpleSchema.RegEx.Id },
  level: SimpleSchema.Integer,
});
