import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function BlogCard({ blogProp }) {
  const { _id, title, content, authorInfo, dateAdded } = blogProp;

  return(
    <Card className="mt-2">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>Content:</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        <Card.Subtitle>Author:</Card.Subtitle>
        <Card.Text>{authorInfo}</Card.Text>
        <Card.Subtitle>Date Added:</Card.Subtitle>
        <Card.Text>{dateAdded}</Card.Text>
        <Link className="btn btn-primary" to={`/blogs/${_id}`}>Read Blog</Link>
      </Card.Body>
    </Card>
  )
}
