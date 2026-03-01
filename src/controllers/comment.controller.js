import asyncHandler from "../utils/asyncHandler.js";
import { addComment, getCommentsByBlog } from "../services/comment.service.js";

export const addCommentController = asyncHandler(async (req, res) => {
  const { text, parentComment } = req.body;

  const comment = await addComment(
    req.params.blogId,
    text,
    req.user.id,
    parentComment || null
  );

  res.status(201).json({
    success: true,
    message: "Comment added",
    data: comment
  });
});

export const getCommentsController = asyncHandler(async (req, res) => {
  const comments = await getCommentsByBlog(req.params.blogId);

  res.status(200).json({
    success: true,
    data: comments
  });
});