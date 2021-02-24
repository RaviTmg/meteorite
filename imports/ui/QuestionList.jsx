import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { QuestionCollection } from "../api/QuestionCollection";
import { CommentCollection } from "../api/CommentCollection";
import CommentList from "./CommentList";
const CommentForm = ({ handleSubmit }) => {
  const [comment, setComment] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(comment);
      }}
    >
      <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      <button type="submit">comment</button>
    </form>
  );
};
const Question = ({ question, handleSubmitComment }) => {
  const [showComment, setShowComment] = useState(false);
  return (
    <div className="question-list-item">
      <div className="question-row">
        <h4>{question.title}</h4>
        <p>{question.content}</p>
        <p>
          {question.upvotes} Upvotes, {question.downvotes} Downvotes
        </p>

        <CommentForm handleSubmit={(comment) => handleSubmitComment(question, comment)} />
        <button onClick={() => setShowComment(true)}>view comments</button>
      </div>
      {showComment && <CommentList questionId={question._id} />}
    </div>
  );
};
const QuestionList = () => {
  const user = useTracker(() => Meteor.user());
  const questions = useTracker(() => QuestionCollection.find({}).fetch());
  // const comments = useTracker(() => CommentCollection.find({}).fetch());

  console.log("QuestionList -> questions", questions);
  // useEffect(() => {
  //   Meteor.call("getComments", "nnRufS6mMK5hw3qb6", function (error, message) {
  //     console.log(message);
  //     // identify the error
  //     if (error && error.error === "logged-out") {
  //       // show a nice error message
  //       Session.set("errorMessage", "Please log in to post a comment.");
  //     }
  //   });
  // }, []);
  const handleSubmitComment = (question, content) => {
    CommentCollection.insert({
      content,
      questionId: question._id,
      userId: user._id,
      upvotes: 0,
      downvotes: 0,
      level: 1,
    });
  };
  return (
    <div className="question-list">
      {questions.map((question, i) => (
        <Question question={question} handleSubmitComment={handleSubmitComment} ke={i} />
      ))}
    </div>
  );
};

export default QuestionList;
