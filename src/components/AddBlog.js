import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import UserContext from "../context/UserContext";

export default function AddBlog({ fetchData }) {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorInfo, setAuthorInfo] = useState(user?.name || "");

  const notyf = new Notyf({
    duration: 3000,
    position: { x: "right", y: "top" },
  });

  const handleClose = () => {
    setShow(false);
    setTitle("");
    setContent("");
    setAuthorInfo(user?.name || ""); // Reset author field
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = { title, content, authorInfo };

    try {
      const response = await fetch("https://blogapp-server-1-uj1f.onrender.com/blogs/addBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        notyf.success("Blog added successfully!");
        fetchData();
        handleClose();
      } else {
        notyf.error(data.message || "Error adding blog");
      }
    } catch (err) {
      notyf.error("Network error");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add Blog
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={authorInfo}
                onChange={(e) => setAuthorInfo(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
