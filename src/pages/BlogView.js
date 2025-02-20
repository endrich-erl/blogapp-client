import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

export default function BlogView() {
    const notyf = new Notyf();
    const { blogId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorInfo, setAuthorInfo] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    function addComment() {
        if (!newComment.trim()) {
            notyf.error("Comment cannot be empty.");
            return;
        }

        fetch(`https://blogapp-server-1-uj1f.onrender.com/addComment/${blogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ comment: newComment })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                notyf.error(data.error);
            } else {
                notyf.success("Comment added successfully");
                setComments(data.comments);
                setNewComment("");
            }
        })
        .catch(error => {
            notyf.error("Failed to add comment. Try again.");
        });
    }

    function deleteComment(commentId) {
        fetch(`https://blogapp-server-1-uj1f.onrender.com/blogs/deleteComment/${blogId}/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                notyf.error(data.error);
            } else {
                notyf.success("Comment deleted successfully");
                setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            }
        })
        .catch(error => {
            notyf.error("Failed to delete comment. Try again.");
        });
    }

    useEffect(() => {
        fetch(`https://blogapp-server-1-uj1f.onrender.com/blogs/getBlog/${blogId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setTitle(data.title);
            setContent(data.content);
            setAuthorInfo(data.authorInfo);
        });

        fetch(`https://blogapp-server-1-uj1f.onrender.com/blogs/getComments/${blogId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setComments(data.comments);
            }
        });
    }, [blogId]);

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">By {authorInfo}</Card.Subtitle>
                            <Card.Text>{content}</Card.Text>
                            <hr />
                            <h5>Comments</h5>
                            {comments.length > 0 ? (
                                comments.map((c, index) => (
                                    <Card key={index} className="mb-2">
                                        <Card.Body>
                                            <p>{c.comment}</p>
                                            {user.id === c.userId && (
                                                <Button variant="danger" size="sm" onClick={() => deleteComment(c._id)}>Delete</Button>
                                            )}
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                            {user.id !== null ? (
                                <>
                                    <Form.Group>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Write a comment..." 
                                            value={newComment} 
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" className="mt-2" onClick={addComment}>Add Comment</Button>
                                </>
                            ) : (
                                <Link className="btn btn-danger btn-block" to="/login"> Log in to Comment</Link>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
