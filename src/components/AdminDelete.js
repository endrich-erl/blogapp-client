import { useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Button, Modal } from "react-bootstrap";

const notyf = new Notyf();

export default function AdminDelete({ blogId, fetchData }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://blogapp-server-1-uj1f.onrender.com/blogs/deleteBlog/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete blog");
      }

      notyf.success("Blog deleted successfully");
      fetchData();
    } catch (error) {
      notyf.error(error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
