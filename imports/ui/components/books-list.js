import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Book } from './book.js';

export const BooksList = ({ books }) => (
  (books && books.length > 0) ? <ListGroup className="books-list">
    {books.map((doc) => (
      <Book key={ doc._id } book={ doc } />
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No books found.</Alert>
);

BooksList.propTypes = {
  books: React.PropTypes.array,
};
