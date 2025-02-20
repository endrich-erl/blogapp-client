import { useState, useEffect, useContext } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // FIXED: Link instead of Button
import UpdateBlog from "../components/UpdateBlog";
import DeleteBlog from "../components/DeleteBlog";
import UserContext from "../context/UserContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = () => {
    fetch("https://blogapp-server-1-uj1f.onrender.com/blogs/getUserBlog", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  };

  useEffect(() => {
    if (!token) {
      console.error("No token found, user might not be logged in.");
      return;
    }

    fetch("https://blogapp-server-1-uj1f.onrender.com/users/details", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User details fetched:", data); // 🔥 Debugging log
        if (data && data.username) {
          setUser(data);
        } else {
          console.error("User data is missing or invalid:", data);
        }
      })
      .catch((err) => console.error("Error fetching user details:", err));

    fetchData();
  }, [token]);

  return (
    <Container>
      <h3 className="text-center mt-4">Profile</h3>

      {user ? ( // Check if user exists before rendering
        <Card className="mb-4 p-3 shadow-sm">
          <Card.Body>
            <Card.Title className="fw-bold fs-4">{user.username}</Card.Title>
            <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center text-danger">User details not found.</p>
      )}

      <h3 className="text-center mt-4">Your Blogs</h3>
      <Row className="justify-content-center">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Col md={10} key={blog._id}>
              <Card className="mb-4 p-3 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold fs-4">{blog.title}</Card.Title>
                  <Card.Text><strong>Content:</strong> {blog.content}</Card.Text>
                  <Card.Text><strong>Author:</strong> {blog.authorInfo}</Card.Text>
                  <Card.Text><strong>Date Added:</strong> {(blog.dateAdded).toLocaleString()}</Card.Text>
                  <div className="d-flex gap-2">
                    <Link className="btn btn-primary" to={`/blogs/${blog._id}`}>
                      Read Blog
                    </Link>
                    <UpdateBlog blogId={blog._id} fetchData={fetchData} />
                    <DeleteBlog blogId={blog._id} fetchData={fetchData} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No blogs found.</p>
        )}
      </Row>
    </Container>
  );
}
