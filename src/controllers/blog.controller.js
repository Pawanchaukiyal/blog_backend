import asyncHandler from "../utils/asyncHandler.js";
import { createBlog, deleteBlog, getBlogs, getSingleBlog, updateBlog } from "../services/blog.service.js";
import cloudinary from "../config/cloudinary.js";

export const createBlogController = asyncHandler(async (req, res) => {
  let imageUrl = "";

  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog_images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    imageUrl = result.secure_url;
  }

  const blog = await createBlog(
    {
      title: req.body.title,
      description: req.body.description,
      image: imageUrl
    },
    req.user.id
  );

  res.status(201).json({
    success: true,
    message: "Blog created",
    data: blog
  });
});

export const getBlogsController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const { blogs, total } = await getBlogs(page, limit);

  res.status(200).json({
    success: true,
    data: blogs,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
});

export const getSingleBlogController = asyncHandler(async (req, res) => {
  const blog = await getSingleBlog(req.params.id);

  res.status(200).json({
    success: true,
    data: blog
  });
});

export const updateBlogController = asyncHandler(async(req,res)=>{
  const blog = await updateBlog(
    req.params.id,
    req,body,
    req.user
  );
  res.status(200).json({
    success:true,
    message:"Blog updated",
    data:blog
  })
})

export const deleteBlogController = asyncHandler(async (req, res) => {
  await deleteBlog(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Blog deleted"
  });
});

