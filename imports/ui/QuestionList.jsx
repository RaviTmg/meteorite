import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { QuestionCollection } from "../api/QuestionCollection";
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
  const questions = useTracker(() => {
    const handler = Meteor.subscribe("questions");
    if (!handler.ready()) return [];
    return QuestionCollection.find({}).fetch();
  });

  const handleSubmitComment = (question, content) => {
    Meteor.call("comments.insert", {
      content,
      questionId: question._id,
      level: 1,
    });
  };
  return (
    <div className="question-list">
      {questions.map((question, i) => (
        <Question question={question} handleSubmitComment={handleSubmitComment} key={i} />
      ))}
    </div>
  );
};

export default QuestionList;
