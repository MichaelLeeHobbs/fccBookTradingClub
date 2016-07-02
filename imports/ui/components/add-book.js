import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertBook } from '../../api/books/methods.js';

const handleInsertBook = (event) => {
  const target = event.target;
  const title = target.value.trim();

  if (title !== '' && event.keyCode === 13) {
    insertBook.call({
      title,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Book added!', 'success');
      }
    });
  }
};

export const AddBook = () => (
  <FormGroup>
    <FormControl
      type="text"
      onKeyUp={ handleInsertBook }
      placeholder="Type a book title and press enter..."
    />
  </FormGroup>
);
