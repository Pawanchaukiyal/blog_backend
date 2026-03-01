import Blog from '../models/blog.model.js';
import AppError from '../utils/AppError.js';

export const createBlog = async (data, userId) => {
const blog = await Blog.create({
    ...data, author: userId
});

return blog;
}

export const getBlogs = async(page, limit) => {
    const skip = (page - 1) * limit;
    const blogs = await Blog.find()
        .skip(skip)
        .limit(limit)
        .populate('author', 'email');

        const total = await Blog.countDocuments();
    return { blogs, total };
}

export const getSingleBlog = async (id) =>{
    const blog = await Blog.findById(id).populate( 'author', 'email');
    if(!blog){
        throw new AppError('Blog not found', 404);
    }
    return blog;
}

export const updateBlog = async(id, data, user, file) =>{
    const blog = await Blog.findById(id);

    if(!blog)
    {
        throw new AppError("Blog not found", 404);
    }

 if (blog.author.toString() !== user.id && user.role !== "admin") {
    throw new AppError("Forbidden", 403);
  }

  blog.title = data.title || blog.title;
  blog.description = data.description || blog.description;

 if (file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog_images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    blog.image = result.secure_url;
  }

  await blog.save();
  return blog;
};

export const deleteBlog = async(id, user) =>{
    const blog = await Blog.findById(id);

    if(!blog)
    {
        throw new AppError("Blog not found", 404);
    }

    if(blog.author.toString() !== user.id && user.role !== "admin")
    {
        throw new AppError("Forbidden", 403);
    }

    await blog.deleteOne();

    return;
}