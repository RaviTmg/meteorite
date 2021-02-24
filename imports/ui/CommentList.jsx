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
            handleComment(comment, commentInp);
          }}
        >
          <textarea value={commentInp} onChange={(e) => setCommentInp(e.target.value)} />
          <button type="submit">comment</button>
        </form>
      )}
    </div>
  );
};
const CommentList = ({ questionId }) => {
  const comments = useTracker(() => CommentCollection.find({ questionId }).fetch());
  const user = useTracker(() => Meteor.user());
  const nestedComments = createHierarchyFromArray(comments);
  const handleComment = (comment, content) => {
    CommentCollection.insert({
      content,
      questionId,
      userId: user._id,
      upvotes: 0,
      downvotes: 0,
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
