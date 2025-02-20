import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import AddBlog from "./AddBlog";

export default function UserView({ blogsData, fetchData }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log(blogsData);
    const blogsArr = blogsData.map((blog) => (
      <BlogCard blogProp={blog} key={blog._id} />
    ));
    setBlogs(blogsArr);
  }, [blogsData]);

  return (
    <div className="container">
      <h3 className="text-center m-3">Our Blogs</h3>
      <AddBlog fetchData={fetchData} />
      {blogs}
    </div>
  );
}
