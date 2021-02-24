import { Meteor } from "meteor/meteor";
import { CommentCollection } from "../imports/api/CommentCollection";
import { QuestionCollection } from "../imports/api/QuestionCollection";
import { Accounts } from "meteor/accounts-base";
import { Match, check } from "meteor/check";
import { loremIpsum } from "lorem-ipsum";

const insertQuestion = (question) => QuestionCollection.insert(question);
const dummyquestions = [
  {
    title: "Hello World",
    content: "Good morning everyone. Hope all is well",
    upvotes: 10,
    downvotes: 1,
  },
  {
    title: "Loreum ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    upvotes: 10,
    downvotes: 1,
  },
  {
    title: "pellentesque id nibh",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    upvotes: 10,
    downvotes: 1,
  },
];
Meteor.startup(() => {
  const defUserName = "Rawv";
  if (!Accounts.findUserByUsername(defUserName)) {
    const userId = Accounts.createUser({ username: defUserName, password: "password" });

    if (!QuestionCollection.find().count()) {
      dummyquestions.forEach((question) => [insertQuestion({ ...question, userId })]);
    }
  }
  SyncedCron.add({
    name: "Simple Cron job",
    schedule: function (parser) {
      return parser.text("every 2 hours");
    },
    job: function () {
      const content = loremIpsum();
      const title = loremIpsum({ count: 2, units: "words" });
      QuestionCollection.insert({ content, title });
      return { content, title };
    },
  });
  SyncedCron.start();
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
