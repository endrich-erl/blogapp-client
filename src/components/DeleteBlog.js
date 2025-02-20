import { Button } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function DeleteBlog({ blogId, fetchData }) {
  const notyf = new Notyf();

  const handleDelete = () => {
    fetch(`https://blogapp-server-1-uj1f.onrender.com/blogs/deleteBlog/${blogId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          notyf.success("Blog deleted successfully!");
          fetchData();
        } else {
          notyf.error("Failed to delete blog.");
        }
      })
      .catch(() => notyf.error("An error occurred while deleting the blog."));
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
}
