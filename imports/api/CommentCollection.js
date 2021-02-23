import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { QuestionCollection } from "./QuestionCollection";

export const CommentCollection = new Mongo.Collection("comments");
CommentCollection.schema = new SimpleSchema({
  content: { type: String },
  upvotes: { type: SimpleSchema.Integer },
  downvotes: { type: SimpleSchema.Integer },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  parentId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  level: SimpleSchema.Integer,
});
