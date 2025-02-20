import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function UpdateBlog({ blogId, fetchData }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorInfo, setAuthorInfo] = useState("");
  const notyf = new Notyf();

  const handleUpdate = () => {
    fetch(`https://blogapp-server-1-uj1f.onrender.com/blogs/updateBlog/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content, authorInfo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          notyf.success("Blog updated successfully!");
          fetchData();
          setShow(false);
        } else {
          notyf.error(data.message || "Failed to update blog.");
        }
      })
      .catch(() => notyf.error("An error occurred while updating the blog."));
  };

  return (
    <>
      <Button variant="success" className="" onClick={() => setShow(true)}>
        Edit
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter new content"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={authorInfo}
                onChange={(e) => setAuthorInfo(e.target.value)}
                placeholder="Enter new author name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
