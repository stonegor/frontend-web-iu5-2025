import { FC } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Author } from '../api/types';
import predictionStore from '../store/prediction';

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: FC<AuthorCardProps> = ({ author }) => {
  const imageUrl = author.image_url || '/default-author.svg';

  const handleAdd = () => {
    predictionStore.addAuthor(author);
  };

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={imageUrl} alt={author.name} />
      <Card.Body>
        <Card.Title>{author.name}</Card.Title>
        <Card.Text>
          In an average of 100 words:
        </Card.Text>
        <div className="stats-grid">
          <div className="column">
            <p>в: {author.count_v}</p>
            <p>и: {author.count_i}</p>
            <p>но: {author.count_no}</p>
            <p>ли: {author.count_li}</p>
          </div>
          <div className="column">
            <p>да: {author.count_da}</p>
            <p>же: {author.count_zhe}</p>
            <p>или: {author.count_ili}</p>
            <p>либо: {author.count_libo}</p>
          </div>
        </div>
        <Link to={`/authors/${author.id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
        <Button variant="secondary" onClick={handleAdd} className="ms-2">
          Add to Prediction
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AuthorCard;
