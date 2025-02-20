import { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

// Initialize Notyf
const notyf = new Notyf();

export default function AdminComment({ blogId, show, handleClose, fetchData }) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show) {
            fetchComments();
        }
    }, [show]);

    const fetchComments = () => {
        setError(null);
        fetch(`https://blogapp-server-1-uj1f.onrender.com/blogs/getComments/${blogId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setComments(data.comments);
                } else {
                    setComments([]);
                    setError("No comments found.");
                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                setError("Failed to fetch comments.");
            });
    };

    const handleDeleteComment = (commentId) => {
        fetch(`https://blogapp-server-1-uj1f.onrender.com/blogs/deleteComment/${blogId}/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
                    notyf.success("Comment deleted successfully!");
                } else {
                    console.error("Failed to delete comment:", data.error);
                    notyf.error("Failed to delete comment!");
                }
            })
            .catch(error => {
                console.error("Error deleting comment:", error);
                notyf.error("Error deleting comment!");
            });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>View Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : comments.length > 0 ? (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr className="text-center">
                                <th className="text-light bg-dark">Comment</th>
                                <th className="text-light bg-dark">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map(comment => (
                                <tr key={comment._id}>
                                    <td>{comment.comment}</td>
                                    <td className="text-center">
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleDeleteComment(comment._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p className="text-center">No comments found.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={fetchComments}>
                    Refresh Comments
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
