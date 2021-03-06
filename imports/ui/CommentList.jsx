import React, { useState } from "react";
import { CommentCollection } from "../api/CommentCollection";
import { createHierarchyFromArray } from "../utils/createHierarchyFromArray";
import { useTracker } from "meteor/react-meteor-data";
const SingleComment = ({ comment, handleComment }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentInp, setCommentInp] = useState("");

  return (
    <div>
      <span>{comment.content}</span>
      {!isCommenting && <button onClick={() => setIsCommenting(true)}>add comment</button>}
      {isCommenting && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (commentInp === "") return;
            handleComment(comment, commentInp);
            setIsCommenting(false);
            setCommentInp("");
          }}
        >
          <textarea value={commentInp} onChange={(e) => setCommentInp(e.target.value)} />
          <button type="submit">post</button>
        </form>
      )}
    </div>
  );
};
const CommentList = ({ questionId }) => {
  const comments = useTracker(() => {
    const handler = Meteor.subscribe("comments", questionId);
    if (!handler.ready()) return [];
    return CommentCollection.find({ questionId }).fetch();
  });
  const nestedComments = createHierarchyFromArray(comments);
  const handleComment = (comment, content) => {
    Meteor.call("comments.insert", {
      content,
      questionId,
      level: comment.level + 1,
      parentId: comment._id,
    });
  };
  const renderCommentRow = (comment) => (
    <li>
      <SingleComment comment={comment} handleComment={handleComment} />
      <ul>{comment.children.map(renderCommentRow)}</ul>
    </li>
  );
  return <ul>{nestedComments.map(renderCommentRow)}</ul>;
};

export default CommentList;
