import { Meteor } from "meteor/meteor";
import { CommentCollection } from "../imports/api/CommentCollection";
import { QuestionCollection } from "../imports/api/QuestionCollection";
import { Accounts } from "meteor/accounts-base";

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
Meteor.startup(() => {
  if (!QuestionCollection.find().count()) {
    dummyquestions.forEach((question) => [insertQuestion(question)]);
  }
  // dummyComments.forEach((comment) => {
  //   CommentCollection.insert(comment);
  // });
});
Meteor.methods({
  getComments(questionId) {
    return CommentCollection.find({}).fetch();
  },
});
