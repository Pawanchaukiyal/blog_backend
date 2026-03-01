import Comment from "../models/comment.model.js";
import AppError from "../utils/AppError.js";

export const addComment = async (blogId, text, userId, parentComment = null) => {
  const comment = await Comment.create({
    text,
    blog: blogId,
    author: userId,
    parentComment
  });

  return comment;
};

export const getCommentsByBlog = async (blogId) => {
  const comments = await Comment.find({ blog: blogId })
    .populate("author", "email")
    .sort({ createdAt: -1 });

  return comments;
};