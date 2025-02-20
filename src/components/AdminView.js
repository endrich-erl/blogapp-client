import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminDelete from "./AdminDelete";
import AdminComment from "./AdminComment";

export default function AdminView({ blogsData, fetchData }) {
    const [blogs, setBlogs] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    useEffect(() => {
        const blogsArr = blogsData.map(blog => (
            <tr key={blog._id}>
                <td>{blog._id}</td>
                <td>{blog.title}</td>
                <td>{blog.content.substring(0, 100)}...</td>
                <td>{blog.authorInfo}</td>
                <td>{new Date(blog.dateAdded).toLocaleDateString()}</td>
                <td>
                    <div className="d-flex gap-2">
                        <Button className="btn-primary text-light" onClick={() => handleShowComments(blog._id)}>
                            Comments
                        </Button>
                        <AdminDelete blogId={blog._id} fetchData={fetchData} />
                    </div>
                </td>
            </tr>
        ));
        setBlogs(blogsArr);
    }, [blogsData, fetchData]);

    const handleShowComments = (blogId) => {
        setSelectedBlogId(blogId);
        setShowComments(true);
    };

    return (
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th className="text-light bg-dark">ID</th>
                        <th className="text-light bg-dark">Title</th>
                        <th className="text-light bg-dark">Content</th>
                        <th className="text-light bg-dark">Author</th>
                        <th className="text-light bg-dark">Date</th>
                        <th className="text-light bg-dark">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs}
                </tbody>
            </Table>

            {selectedBlogId && (
                <AdminComment
                    blogId={selectedBlogId}
                    show={showComments}
                    handleClose={() => setShowComments(false)}
                    fetchData={fetchData}
                />
            )}
        </>
    );
}
