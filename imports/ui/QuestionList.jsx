import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { QuestionCollection } from "../api/QuestionCollection";
import { CommentCollection } from "../api/CommentCollection";
import CommentList from "./CommentList";
const Question = ({ question }) => {
  const [showComment, setShowComment] = useState(false);
  return (
    <>
      <div>
        <h4>{question.title}</h4>
        <p>{question.content}</p>
        <button onClick={() => setShowComment(true)}>view</button>
      </div>
      {showComment && <CommentList questionId={question._id} />}
    </>
  );
};
const QuestionList = () => {
  const user = useTracker(() => Meteor.user());
  const questions = useTracker(() => QuestionCollection.find({}).fetch());
  // const comments = useTracker(() => CommentCollection.find({}).fetch());

  console.log("QuestionList -> questions", questions);
  useEffect(() => {
    Meteor.call("getComments", "nnRufS6mMK5hw3qb6", function (error, message) {
      console.log(message);
      // identify the error
      if (error && error.error === "logged-out") {
        // show a nice error message
        Session.set("errorMessage", "Please log in to post a comment.");
      }
    });
  }, []);
  return (
    <div>
      {questions.map((question) => (
        <Question question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
