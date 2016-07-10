import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BookSearch = new Mongo.Collection('BookSearch');

BookSearch.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

BookSearch.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

BookSearch.schema = new SimpleSchema({
  oclc: {
    type: String,
    label: 'Open Library OCLC number',
  },
  search: {
    type: String,
    label: 'Search String used to find this book.',
  },
  coverUrl: {
    type: String,
    label: 'Medium size cover page',
  }
});

BookSearch.attachSchema(BookSearch.schema);
