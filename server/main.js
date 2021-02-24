import { Meteor } from "meteor/meteor";
import { CommentCollection } from "../imports/api/CommentCollection";
import { QuestionCollection } from "../imports/api/QuestionCollection";
import { Accounts } from "meteor/accounts-base";
import { createHierarchyFromArray } from "../imports/utils/createHierarchyFromArray";
import { Match, check } from "meteor/check";

// import SyncedCron from "meteor/little"
const insertQuestion = (question) => QuestionCollection.insert(question);
const dummyquestions = [
  {
    userId: "bcv67Ck82xdMrPumr",
    title: "Hello World",
    content: "good mork=ning world",
    upvotes: 10,
    downvotes: 1,
  },
  {
    userId: "bcv67Ck82xdMrPumr",
    title: "Loreum ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    upvotes: 10,
    downvotes: 1,
  },
  {
    userId: "bcv67Ck82xdMrPumr",
    title: "pellentesque id nibh",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    upvotes: 10,
    downvotes: 1,
  },
  {
    userId: "bcv67Ck82xdMrPumr",
    title: "nibh venenatis cras",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    upvotes: 10,
    downvotes: 1,
  },
];
const dummyComments = [
  {
    content: "faucibus et molestie",
    upvotes: 1,
    downvotes: 1,
    userId: "tLfssH5d9WmsptMne",
    questionId: "nnRufS6mMK5hw3qb6",
    parentId: "viEaNrXbKxCLnLYS6",
    level: 3,
  },
];
// const crushSomeNumbers = () =>
//   Meteor.publish("crunch", function () {
//     this.ready();
//     return "lala lala";
//   });
Meteor.startup(() => {
  if (!QuestionCollection.find().count()) {
    dummyquestions.forEach((question) => [insertQuestion(question)]);
  }
  SyncedCron.add({
    name: "Crunch some important numbers for the marketing department",
    schedule: function (parser) {
      // parser is a later.parse object
      return parser.text("every 1 min");
    },
    job: function () {
      var numbersCrunched = crushSomeNumbers();
      return numbersCrunched;
    },
  });
  // SyncedCron.start();
  // dummyComments.forEach((comment) => {
  //   CommentCollection.insert(comment);
  // });
});
Meteor.publish("questions", function publishTasks() {
  return QuestionCollection.find({});
});
Meteor.publish("comments", function (questionId) {
  return CommentCollection.find({ questionId });
});
Meteor.methods({
  "questions.insert"({ title, content }) {
    check(title, String);
    check(content, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    QuestionCollection.insert({
      title,
      content: new Date(),
      userId: this.userId,
    });
  },
  "comments.insert"({ content, questionId, level, parentId }) {
    check(content, String);
    check(questionId, String);
    check(level, Match.Integer);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    CommentCollection.insert({
      content,
      questionId,
      level,
      userId: this.userId,
      parentId,
    });
  },
  finduserbyusername(name) {
    return Accounts.findUserByUsername(name);
  },
});
