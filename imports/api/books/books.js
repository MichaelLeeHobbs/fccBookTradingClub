import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Books = new Mongo.Collection('Books');

Books.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Books.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Books.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the book.',
  },
  subtitle: {
    type: String,
    label: 'subtitle',
  },
  isbn_13: {
    type: [String],
    label: 'isbn_13',
  },
  isbn_10: {
    type: [String],
    label: 'isbn_10',
  },
  authors: {
    type: [String],
    label: 'authors',
  },
  coverUrls: {
    type: [String],
    label: 'coverUrls',
  },
  owner: {
    type: String,
    label: 'Owner ID',
  },
  tradeRequestId: {
    type: String,
    label: 'Id of the users requesting a trade request.'
  },
  olUrl: {
    type: String,
    label: 'OpenLibrary URL',
  },

});

Books.attachSchema(Books.schema);

//Factory.define('book', Books, {
//  title: () => faker.hacker.phrase(),
//});
