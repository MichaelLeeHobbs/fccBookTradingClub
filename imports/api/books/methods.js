import { Books } from './books';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';
import { Bert } from 'meteor/themeteorchef:bert';

function mustBeLoggedIn(schema, method, action) {
  if (!Meteor.userId()) {
    // Throw errors with a specific error code
    throw new Meteor.Error(`${schema}s.methods.${method}.notLoggedIn`,
      `Must be logged in to '${action} ${schema.toLowerCase()}'.`);
  }
}

function mustBeOwner(schema, method, action, id) {
  let book = Books.findOne({_id: id});
  if (!book) {
    // todo improve this
    throw new Meteor.Error(`${schema}s.methods.${method}.notOwner`, `Book not found.`);
  }

  if (Meteor.userId() !== book.owner) {
    // Throw errors with a specific error code
    throw new Meteor.Error(`${schema}s.methods.${method}.notOwner`,
      `Must be the owner to '${action} ${schema.toLowerCase()}'.`);
  }
}

function mustBeLoggedInAndOwner(schema, method, action, id) {
  mustBeLoggedIn(schema, method, action);
  mustBeOwner(schema, method, action, id);
}

export const insertBook = new ValidatedMethod({
  name: 'books.insert',
  validate: new SimpleSchema({
    title: {type: String},
  }).validator(),
  run(book) {
    mustBeLoggedIn('Book', 'insert', 'add a');
    book.owner = Meteor.userId();
    Books.insert(book);
  },
});

export const searchBook = new ValidatedMethod({
  name: 'books.search',
  validate: new SimpleSchema({
    title: {type: String},
  }).validator(),
  run(book) {
    mustBeLoggedIn('Book', 'search', 'search');
  },
});


export const updateBook = new ValidatedMethod({
  name: 'books.update',
  validate: new SimpleSchema({
    _id: {type: String},
    'update.title': {type: String, optional: true},
  }).validator(),
  run({ _id, update }) {
    mustBeLoggedInAndOwner('Book', 'update', 'update a', _id);
    Books.update(_id, {$set: update});
  },
});

export const removeBook = new ValidatedMethod({
  name: 'books.remove',
  validate: new SimpleSchema({
    _id: {type: String},
  }).validator(),
  run({ _id }) {
    mustBeLoggedInAndOwner('Book', 'remove', 'remove this', _id);
    Books.remove(_id);
  },
});

rateLimit({
  methods: [
    insertBook,
    updateBook,
    removeBook,
  ],
  limit: 5,
  timeRange: 1000,
});
